import React, { useRef, useCallback, useMemo } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { WithArticleId } from 'features/articles';
import { TypeActivities } from 'app/stackflow';
import { getQueryKeys } from 'shared/api';
import { LOST_FOUND_QUERY_KEY } from 'pages/lost-found/api/query-key';
import { queryClient } from 'app/lib/react-query';
import { AxiosResponse } from 'axios';
import { IResponse } from 'entities/with-server';
import { CommentList } from 'features/comments/model';
import { CommentCard } from 'widgets/comments/ui/CommentCard';
import CommentTextField from 'widgets/comments/ui/CommentTextField';
import { EditorState } from 'lexical';

const CommentInnerPage: ActivityComponentType<
  WithArticleId & {
    commentId: number;
    from: Extract<
      KeyOf<TypeActivities>,
      'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'
    >;
    mode: 'reply' | 'edit';
  }
> = ({ params: { articleId, commentId, from, mode } }) => {
  console.log('mode:', mode);
  const commentQueryData = useMemo(() => {
    switch (from) {
      case 'LostFoundDetail':
        return queryClient.getQueryData(
          getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
        ) as AxiosResponse<IResponse<CommentList>>;
      default:
        return null;
    }
  }, [from]);

  const targetedCommentMap = useMemo(() => {
    if (!commentQueryData) return null;
    return commentQueryData.data.result.comments.find(
      (item) => item.parentComment.id === commentId,
    );
  }, [commentQueryData]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const handleHitBottom = useCallback(() => {
    bottomRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, []);

  const content = useRef<string>('');
  const handleSubmit = () => {
    handleHitBottom();
  };

  if (!targetedCommentMap) return <></>;

  return (
    <Layout>
      <CommentCard comment={targetedCommentMap.parentComment} />
      {targetedCommentMap.childComments.map((childComment) => (
        <CommentCard asChild key={childComment.id} comment={childComment} />
      ))}
      <CommentTextField
        disabled={false}
        placeholder="댓글을 남겨주세요."
        onSubmit={handleSubmit}
        onChange={(val: EditorState) => {
          content.current = JSON.stringify(val.toJSON());
        }}
      />
      <div ref={bottomRef} css={{ height: '1px' }} />
    </Layout>
  );
};

export default CommentInnerPage;

import React, { useRef, useCallback, Suspense, useMemo, useState } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import { Layout } from 'widgets';
import { WithArticleId } from 'features/articles';
import { TypeActivities } from 'app/stackflow';
import { CommentCard } from 'widgets/comments/ui/CommentCard';
import CommentTextField from 'widgets/comments/ui/CommentTextField';
import { EditorState } from 'lexical';
import { ArticleContentParser } from 'features/articles/ui/ArticleContentParser';
import { Loading } from 'entities/app-loaders';
import { useAuthStore } from 'entities/app-authentications/slice';
import { isEmptyContent } from 'features/articles/lib/has-content-error';
import { useGetLostFoundComments } from 'pages/lost-found/api/get-comments';
import * as styles from 'features/articles/ui/BaseArticleTemplate.css';
import * as pageStyles from './Page.css';
import { usePostComment } from 'pages/lost-found/api/post-comment';
import { useUpdateComment } from 'pages/lost-found/api/post-comment';

const CommentInnerPage: React.FC<
  WithArticleId & {
    commentId: number;
    mode: 'reply' | 'edit';
  }
> = ({ articleId, commentId, mode }) => {
  const { auth } = useAuthStore();
  const disabled = !auth;

  const { data: commentQueryData } = useGetLostFoundComments(articleId);
  const { mutate: submitComment } = usePostComment(articleId, false);
  const { mutate: updateComment } = useUpdateComment(articleId, false);

  const targetCommentMap = useMemo(
    () =>
      commentQueryData.comments.find((item) => {
        return (
          item.parentComment.id === commentId ||
          item.childComments.some((child) => child.id === commentId)
        );
      }),
    [commentQueryData.comments, commentId],
  );

  const parentComment = targetCommentMap.parentComment;
  const targetComment =
    parentComment.id === commentId
      ? parentComment
      : targetCommentMap.childComments.find(
          (childComment) => childComment.id === commentId,
        );

  const [commentInitialState, setCommentInitialState] = useState(
    targetComment.content,
  );

  const content = useRef<string>('');
  const handleSubmit = () => {
    if (isEmptyContent(content.current)) {
      window.alert('댓글을 입력해주세요.');
      return;
    }
    if (!targetComment) {
      console.error('Selected comment not found');
      return;
    }
    if (mode === 'edit') {
      updateComment(
        {
          commentId,
          content: content.current,
        },
        {
          onSuccess: () => {
            setCommentInitialState('');
            setTimeout(handleHitBottom, 100);
          },
        },
      );
      return;
    }

    const upperCommentId =
      mode === 'reply' ? targetComment.id : targetComment.upperCommentId;

    submitComment(
      {
        postId: articleId,
        content: content.current,
        upperCommentId,
        isPrivate: null,
      },
      {
        onSuccess: () => {
          setTimeout(handleHitBottom, 100);
        },
      },
    );
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  const handleHitBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <article css={styles.article}>
        <div css={styles.articleBasicInfos}>
          <h2>{parentComment.writer || 'LOST112'}</h2>
          <time>{parentComment.createdAt}</time>
        </div>

        <ArticleContentParser
          content={parentComment.content}
          isPlainContent={false}
        />

        {targetCommentMap.childComments.length > 0 ? (
          <ul css={pageStyles.commentListWrap}>
            {targetCommentMap.childComments.map((childComment) => (
              <CommentCard
                showEllipsis={false}
                key={childComment.id}
                comment={childComment}
              />
            ))}
          </ul>
        ) : (
          <div css={pageStyles.emptyComment}>댓글을 남겨주세요.</div>
        )}
        <CommentTextField
          disabled={disabled}
          shouldFocusOnMount
          placeholder="댓글을 남겨주세요."
          initialState={mode === 'edit' && commentInitialState}
          onSubmit={handleSubmit}
          onChange={(val: EditorState) => {
            content.current = JSON.stringify(val.toJSON());
          }}
        />
      </article>
      <div ref={bottomRef} css={{ height: '1px' }} />
    </>
  );
};

const CommentInnerPageWrap: ActivityComponentType<
  WithArticleId & {
    commentId: number;
    // 추후 from을 통해 커뮤니티, 민원 페이지도 수용할 수 있게끔 리팩토링
    from: Extract<
      KeyOf<TypeActivities>,
      'CommunityDetail' | 'ComplaintDetail' | 'LostFoundDetail'
    >;
    mode: 'reply' | 'edit';
  }
> = ({ params: { articleId, commentId, mode } }) => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <CommentInnerPage
          articleId={articleId}
          commentId={commentId}
          mode={mode}
        />
      </Suspense>
    </Layout>
  );
};

export default CommentInnerPageWrap;

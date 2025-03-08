import { useMemo } from 'react';

import { useActivity } from '@stackflow/react';

import { formatDateTime } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { communityKeys } from '@/services/community';
import { complaintKeys } from '@/services/complaint';
import { lostFoundKeys } from '@/services/lostFound';
import { useFlow } from '@/stackflow';
import type { Comment } from '@/types';

import * as S from './CommentListItem.styled';

import { CommentDropEllipsis } from '../commentActions/CommentActions.component';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}

const Comment = ({ comment, asChild = false }: CommentCardProps) => {
  const { push } = useFlow();
  const activity = useActivity();

  const queryKey = useMemo(() => {
    if (!activity.params.id) return [];
    switch (activity.params.name) {
      case 'LostFoundDetailPage':
        return lostFoundKeys.detail(+activity.params.id!);
      case 'CommunityDetailPage':
        return communityKeys.detail(+activity.params.id!);
      case 'ComplaintDetailPage':
        return complaintKeys.detail(+activity.params.id!);
      default:
        return [];
    }
  }, [activity.params]);

  return (
    <S.CommentWrapper asChild={asChild} data-comment-id={comment.id}>
      <S.HeaderWrapper>
        <S.WriterName>{comment.writer}</S.WriterName>
        <CommentDropEllipsis
          articleId={activity.params.id!}
          createdBy={+comment.createdBy!}
          commentId={comment.id}
          queryKey={queryKey as unknown[]}
        />
      </S.HeaderWrapper>
      <S.ContentWrapper>
        {comment.isPrivate ? (
          <S.DeletedComment>비공개 댓글입니다.</S.DeletedComment>
        ) : comment.status === 'CREATED' ? (
          <UiComponent.ReadonlyEditor overrideCss={S.readonlyEditorCss} content={comment.content} />
        ) : (
          <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>
        )}
        <S.DateText>{formatDateTime(comment.createdAt, { format: 'short' })}</S.DateText>
      </S.ContentWrapper>
      <S.ReplyButton
        onClick={() =>
          push('NewCommentReplyPage', {
            commentId: comment.id,
            id: +activity.params.id!,
          })
        }
      >
        답글 달기
      </S.ReplyButton>
    </S.CommentWrapper>
  );
};

export default Comment;

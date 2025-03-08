import { useActivity } from '@stackflow/react';

import { formatDateTime } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { useFlow } from '@/stackflow';
import type { Comment } from '@/types';

import * as S from './CommentListItem.styled';

import { CommentDropEllipsis } from '../commentActions/CommentActions.component';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
  servicePath?: string;
  queryKey?: readonly unknown[];
}

const Comment = ({ comment, asChild = false, servicePath, queryKey }: CommentCardProps) => {
  const { push } = useFlow();
  const activity = useActivity();

  return (
    <S.CommentWrapper asChild={asChild} data-comment-id={comment.id}>
      <S.HeaderWrapper>
        <S.WriterName>{comment.writer}</S.WriterName>
        {queryKey && comment.status === 'CREATED' && (
          <CommentDropEllipsis
            articleId={activity.params.id!}
            createdBy={+comment.createdBy!}
            commentId={comment.id}
            queryKey={queryKey}
          />
        )}
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
      {queryKey && servicePath && !asChild && (
        <S.ReplyButton
          onClick={() => {
            push('NewCommentReplyPage', {
              commentId: comment.id,
              id: +activity.params.id!,
              queryKey,
              servicePath,
            });
          }}
        >
          답글 달기
        </S.ReplyButton>
      )}
    </S.CommentWrapper>
  );
};

export default Comment;

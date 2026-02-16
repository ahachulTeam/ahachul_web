import { useActivity } from '@stackflow/react';

import type { ApiServicePath } from '@ahhachul/http';
import { formatDisplayDate } from '@ahhachul/utils';

import { UiComponent } from '@/components';
import { useUser } from '@/hooks/domain';
import { useFlow } from '@/stackflow';
import type { Comment } from '@/types';

import * as S from './CommentListItem.styled';

import { CommentDropEllipsis } from '../commentActions/CommentActions.component';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
  servicePath?: ApiServicePath;
  queryKey?: readonly unknown[];
  isArticleAuthor?: boolean;
}

const Comment = ({
  comment,
  asChild = false,
  servicePath,
  queryKey,
  isArticleAuthor,
}: CommentCardProps) => {
  const { push } = useFlow();
  const activity = useActivity();

  const { user } = useUser();
  const isAuthor = user?.memberId === +comment.createdBy;
  const isSuper = (comment.isPrivate && isAuthor) || (comment.isPrivate && isArticleAuthor);

  return (
    <S.CommentWrapper asChild={asChild} data-comment-id={comment.id}>
      <S.HeaderWrapper>
        <S.WriterName>
          {comment.writer}
          {((comment.isPrivate && isAuthor) || (comment.isPrivate && isArticleAuthor)) && (
            <span css={{ marginLeft: '3px', color: 'var(--ah-color-gray-70)', fontWeight: 400 }}>
              (비공개)
            </span>
          )}
        </S.WriterName>
        {comment.isPrivate && isSuper && queryKey && comment.status === 'CREATED' && (
          <CommentDropEllipsis
            isAuthor={isAuthor}
            articleId={activity.params.id!}
            commentId={comment.id}
            queryKey={queryKey}
          />
        )}
        {!comment.isPrivate && queryKey && comment.status === 'CREATED' && (
          <CommentDropEllipsis
            isAuthor={isAuthor}
            articleId={activity.params.id!}
            commentId={comment.id}
            queryKey={queryKey}
          />
        )}
      </S.HeaderWrapper>
      <S.ContentWrapper>
        {comment.isPrivate && !isAuthor && !isArticleAuthor ? (
          <S.DeletedComment>비공개 댓글입니다.</S.DeletedComment>
        ) : isSuper ? (
          <UiComponent.ReadonlyEditor overrideCss={S.readonlyEditorCss} content={comment.content} />
        ) : comment.status === 'CREATED' ? (
          <UiComponent.ReadonlyEditor overrideCss={S.readonlyEditorCss} content={comment.content} />
        ) : (
          <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>
        )}
        <S.DateText>{formatDisplayDate(comment.createdAt, { format: 'short' })}</S.DateText>
      </S.ContentWrapper>
      {comment.isPrivate && isSuper && queryKey && servicePath && !asChild && (
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
      {!comment.isPrivate && queryKey && servicePath && !asChild && (
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

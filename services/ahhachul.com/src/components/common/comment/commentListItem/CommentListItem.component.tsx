import type { ReactNode } from 'react';

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
  const isSuper = comment.isPrivate && (isAuthor || isArticleAuthor);

  let contentNode = <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>;
  if (comment.isPrivate && !isAuthor && !isArticleAuthor) {
    contentNode = <S.DeletedComment>비공개 댓글입니다.</S.DeletedComment>;
  } else if (isSuper || comment.status === 'CREATED') {
    contentNode = (
      <UiComponent.ReadonlyEditor overrideCss={S.readonlyEditorCss} content={comment.content} />
    );
  }

  let commentAction: ReactNode = null;
  if (queryKey && comment.status === 'CREATED' && (!comment.isPrivate || isSuper)) {
    commentAction = (
      <CommentDropEllipsis
        isAuthor={isAuthor}
        articleId={activity.params.id!}
        commentId={comment.id}
        queryKey={queryKey}
      />
    );
  }

  let replyButton: ReactNode = null;
  if (queryKey && servicePath && !asChild && (!comment.isPrivate || isSuper)) {
    replyButton = (
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
    );
  }

  return (
    <S.CommentWrapper asChild={asChild} data-comment-id={comment.id}>
      <S.HeaderWrapper>
        <S.WriterName>
          {comment.writer}
          {isSuper && (
            <span css={{ marginLeft: '3px', color: 'var(--ah-color-gray-70)', fontWeight: 400 }}>
              (비공개)
            </span>
          )}
        </S.WriterName>
        {commentAction}
      </S.HeaderWrapper>
      <S.ContentWrapper>
        {contentNode}
        <S.DateText>{formatDisplayDate(comment.createdAt, { format: 'short' })}</S.DateText>
      </S.ContentWrapper>
      {replyButton}
    </S.CommentWrapper>
  );
};

export default Comment;

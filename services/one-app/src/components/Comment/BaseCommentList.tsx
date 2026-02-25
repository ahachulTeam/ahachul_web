'use client';

import React from 'react';

import type { Comment, CommentList } from '@/types';

import { CommentCard } from './CommentCard';
import { EmptyCommentList } from './EmptyCommentList';

type CommentListCopy = {
  deleted: string;
  privateHidden: string;
  reply: string;
  edit: string;
  delete: string;
};

interface Props {
  commentsMap: CommentList['comments'];
  currentMemberId?: number | null;
  articleAuthorId?: number | null;
  disabledActions?: boolean;
  copy?: Partial<CommentListCopy>;
  canLike?: boolean;
  onReply?: (comment: Comment) => void;
  onToggleLike?: (comment: Comment) => void;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

function parseMemberId(value: string) {
  const memberId = Number(value);
  return Number.isFinite(memberId) ? memberId : null;
}

export const BaseCommentList = React.memo(
  ({
    commentsMap,
    currentMemberId = null,
    articleAuthorId = null,
    disabledActions = false,
    copy,
    canLike = true,
    onReply,
    onToggleLike,
    onEdit,
    onDelete,
  }: Props) => {
    if (commentsMap.length === 0) return <EmptyCommentList />;

    const isArticleAuthor = currentMemberId !== null && currentMemberId === articleAuthorId;

    const resolveProps = (comment: Comment) => {
      const commentAuthorId = parseMemberId(comment.createdBy);
      const isCommentAuthor = currentMemberId !== null && commentAuthorId === currentMemberId;
      const canViewPrivate = !comment.isPrivate || isCommentAuthor || isArticleAuthor;
      const canEdit = comment.status === 'CREATED' && isCommentAuthor;
      const canReply = comment.status === 'CREATED' && canViewPrivate;
      const canCommentLike = comment.status === 'CREATED' && canViewPrivate;

      return {
        canViewPrivate,
        canEdit,
        canReply,
        canLike: canCommentLike,
      };
    };

    return (
      <>
        {commentsMap.map(({ parentComment, childComments }) => {
          const parentResolved = resolveProps(parentComment);

          return (
            <React.Fragment key={parentComment.id}>
              <CommentCard
                comment={parentComment}
                {...parentResolved}
                canLike={canLike && parentResolved.canLike}
                disabledActions={disabledActions}
                copy={copy}
                onReply={onReply}
                onToggleLike={onToggleLike}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              {childComments.map(childComment => {
                const childResolved = resolveProps(childComment);

                return (
                  <CommentCard
                    asChild
                    key={childComment.id}
                    comment={childComment}
                    {...childResolved}
                    canReply={false}
                    canLike={canLike && childResolved.canLike}
                    disabledActions={disabledActions}
                    copy={copy}
                    onToggleLike={onToggleLike}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </>
    );
  },
);

BaseCommentList.displayName = 'BaseCommentList';

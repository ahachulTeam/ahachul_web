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
  onReply?: (comment: Comment) => void;
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
    onReply,
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

      return {
        canViewPrivate,
        canEdit,
        canReply,
      };
    };

    return (
      <>
        {commentsMap.map(({ parentComment, childComments }) => (
          <React.Fragment key={parentComment.id}>
            <CommentCard
              comment={parentComment}
              {...resolveProps(parentComment)}
              disabledActions={disabledActions}
              copy={copy}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {childComments.map(childComment => (
              <CommentCard
                asChild
                key={childComment.id}
                comment={childComment}
                {...resolveProps(childComment)}
                canReply={false}
                disabledActions={disabledActions}
                copy={copy}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </React.Fragment>
        ))}
      </>
    );
  },
);

BaseCommentList.displayName = 'BaseCommentList';

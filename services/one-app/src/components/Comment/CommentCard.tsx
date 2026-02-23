'use client';

import { formatDisplayDate } from '@ahhachul/utils';

import type { Comment } from '@/types';
import { cn, isLexicalContent } from '@/utils';

import { ReadonlyEditor } from '../Editor';

type CommentCardCopy = {
  deleted: string;
  privateHidden: string;
  reply: string;
  edit: string;
  delete: string;
};

const DEFAULT_COPY: CommentCardCopy = {
  deleted: '삭제된 댓글입니다.',
  privateHidden: '비공개 댓글입니다.',
  reply: '답글 달기',
  edit: '수정',
  delete: '삭제',
};

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
  canViewPrivate?: boolean;
  canEdit?: boolean;
  canReply?: boolean;
  disabledActions?: boolean;
  copy?: Partial<CommentCardCopy>;
  onReply?: (comment: Comment) => void;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

export const CommentCard = ({
  comment,
  asChild = false,
  canViewPrivate = true,
  canEdit = false,
  canReply = false,
  disabledActions = false,
  copy,
  onReply,
  onEdit,
  onDelete,
}: CommentCardProps) => {
  const mergedCopy = { ...DEFAULT_COPY, ...copy };
  const isDeleted = comment.status !== 'CREATED';
  const isPrivateHidden = !isDeleted && comment.isPrivate === true && !canViewPrivate;
  const canRenderContent = !isDeleted && !isPrivateHidden;
  const shouldRenderReply = canReply && !asChild && !isDeleted && !isPrivateHidden;

  let contentNode = <div className="text-body-large-semi text-gray-90">{mergedCopy.deleted}</div>;

  if (isPrivateHidden) {
    contentNode = (
      <div className="text-body-large-semi text-gray-90">{mergedCopy.privateHidden}</div>
    );
  } else if (canRenderContent) {
    contentNode = isLexicalContent(comment.content) ? (
      <ReadonlyEditor
        content={comment.content}
        className={cn('p-0', '[&>div>div]:border-none', '[&>div>div]:p-0')}
      />
    ) : (
      <p className="whitespace-pre-wrap break-words text-body-large-semi text-gray-90">
        {comment.content}
      </p>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col border-b border-b-gray-20 bg-gray-10 px-5 py-4',
        asChild && 'pl-10',
      )}
      data-comment-id={comment.id}
    >
      <div className="flex items-center justify-between pb-2">
        <span className="text-[13px] text-gray-90">{comment.writer}</span>
        {canEdit ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-label-small text-gray-80 disabled:text-gray-60"
              disabled={disabledActions}
              onClick={() => onEdit?.(comment)}
            >
              {mergedCopy.edit}
            </button>
            <button
              type="button"
              className="text-label-small text-red disabled:text-gray-60"
              disabled={disabledActions}
              onClick={() => onDelete?.(comment)}
            >
              {mergedCopy.delete}
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 pb-5">
        {contentNode}
        <span className="text-body-small text-gray-70">
          {formatDisplayDate(comment.createdAt, { format: 'short' })}
        </span>
      </div>
      {shouldRenderReply ? (
        <button
          type="button"
          className="w-max text-label-medium text-gray-90 disabled:text-gray-60"
          disabled={disabledActions}
          onClick={() => onReply?.(comment)}
        >
          {mergedCopy.reply}
        </button>
      ) : null}
    </div>
  );
};

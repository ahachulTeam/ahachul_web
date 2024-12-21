import React from 'react';
import type { Comment } from '@/model/Comment';
import EllipsisHorizontalIcon from '@/common/assets/icons/svgs/ellipsis.svg';
import { cn } from '@/common/utils/cn';
import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor/LexicalSyntaxContentParser';

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}

export const CommentCard = ({ comment, asChild = false }: CommentCardProps) => {
  const isDeleted = comment.status === 'DELETED';

  return (
    <div
      className={cn(
        'flex flex-col border-b border-b-gray-20 bg-gray-10 px-5 py-4',
        asChild && 'pl-10',
      )}
    >
      <div className=" flex items-center justify-between pb-2">
        <span className=" text-gray-90 text-[13px]">{comment.writer}</span>
        <EllipsisHorizontalIcon />
      </div>
      <div className=" flex flex-col gap-3 pb-5">
        {!isDeleted ? (
          <LexicalSyntaxContentParser
            content={comment.content}
            className={cn('p-0', '[&>div>div]:p-0', '[&>div>div]:border-none')}
          />
        ) : (
          <div className=" text-gray-90 text-body-large-semi">
            삭제된 댓글입니다.
          </div>
        )}
        <span className=" text-body-small text-gray-70">
          {comment.createdAt}
        </span>
      </div>
      <button className=" text-gray-90 text-label-medium w-max">
        답글 달기
      </button>
    </div>
  );
};

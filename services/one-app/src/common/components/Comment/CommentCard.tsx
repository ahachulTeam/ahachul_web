'use client';

<<<<<<< HEAD
import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor';
import { EllipsisIcon } from '@/common/assets/icons';
import { cn, formatDate } from '@/common/utils';
import type { Comment } from '@/model';
=======
import React from 'react';

import type { Comment } from '@/model';
import { cn, formatDate } from '@/common/utils';
import { EllipsisIcon } from '@/common/assets/icons';
import { LexicalSyntaxContentParser } from '@/app/(site)/_component/Editor';
>>>>>>> develop

interface CommentCardProps {
  comment: Comment;
  asChild?: boolean;
}

export const CommentCard = ({ comment, asChild = false }: CommentCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col border-b border-b-gray-20 bg-gray-10 px-5 py-4',
        asChild && 'pl-10',
      )}
    >
      <div className=" flex items-center justify-between pb-2">
        <span className=" text-gray-90 text-[13px]">{comment.writer}</span>
        <EllipsisIcon />
      </div>
      <div className=" flex flex-col gap-3 pb-5">
        {comment.status === 'CREATED' ? (
          <LexicalSyntaxContentParser
            content={comment.content}
            className={cn('p-0', '[&>div>div]:p-0', '[&>div>div]:border-none')}
          />
        ) : (
<<<<<<< HEAD
          <div className=" text-gray-90 text-body-large-semi">삭제된 댓글입니다.</div>
        )}
        <span className=" text-body-small text-gray-70">{formatDate(comment.createdAt)}</span>
      </div>
      <button className=" text-gray-90 text-label-medium w-max">답글 달기</button>
=======
          <div className=" text-gray-90 text-body-large-semi">
            삭제된 댓글입니다.
          </div>
        )}
        <span className=" text-body-small text-gray-70">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <button className=" text-gray-90 text-label-medium w-max">
        답글 달기
      </button>
>>>>>>> develop
    </div>
  );
};

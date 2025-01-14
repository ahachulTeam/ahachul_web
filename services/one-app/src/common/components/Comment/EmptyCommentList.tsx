'use client';

import React from 'react';

import { cn } from '@/common/utils/cn';

interface Props {
  className?: string;
}

export const EmptyCommentList = ({ className }: Props) => {
  return (
    <div
      className={cn(
        ' w-full flex flex-col items-center justify-center  min-h-[240px] gap-1',
        className,
      )}
    >
      <p className=" text-label-medium text-gray-80">댓글이 없어요.</p>
      <p className=" text-label-medium text-gray-80">첫 댓글을 남겨주세요.</p>
    </div>
  );
};

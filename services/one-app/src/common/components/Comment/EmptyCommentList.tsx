import { cn } from '@/common/utils/cn';
import React from 'react';

interface Props {
  className?: string;
}

const EmptyCommentList = ({ className }: Props) => {
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

export default EmptyCommentList;

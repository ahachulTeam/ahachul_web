'use client';

import { CommentEmptyState } from '@ahhachul/ui';

import { cn } from '@/util/cn';

interface Props {
  className?: string;
}

export const EmptyCommentList = ({ className }: Props) => {
  return <CommentEmptyState className={cn('w-full', className)} />;
};

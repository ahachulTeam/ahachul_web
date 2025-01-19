'use client';

import React from 'react';

import type { CommentList } from '@/model';

import { CommentCard } from './CommentCard';
import { EmptyCommentList } from './EmptyCommentList';

interface Props {
  commentsMap: CommentList['comments'];
}

export const BaseCommentList = React.memo(({ commentsMap }: Props) => {
  if (commentsMap.length === 0) return <EmptyCommentList />;

  return (
    <>
      {commentsMap.map(({ parentComment, childComments }) => (
        <React.Fragment key={parentComment.id}>
          <CommentCard comment={parentComment} />
          {childComments.map(childComment => (
            <CommentCard asChild key={childComment.id} comment={childComment} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
});

BaseCommentList.displayName = 'BaseCommentList';

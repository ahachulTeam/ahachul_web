'use client';

import React from 'react';

import type { CommentList } from '@/model';
<<<<<<< HEAD

=======
>>>>>>> develop
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
<<<<<<< HEAD
          {childComments.map(childComment => (
=======
          {childComments.map((childComment) => (
>>>>>>> develop
            <CommentCard asChild key={childComment.id} comment={childComment} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
});
<<<<<<< HEAD

BaseCommentList.displayName = 'BaseCommentList';
=======
>>>>>>> develop

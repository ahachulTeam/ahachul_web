import React from 'react';
import type { CommentList } from '@/model/Comment';
import { CommentCard } from './CommentCard';

interface Props {
  commentsMap: CommentList['comments'];
}

export const BaseCommentList = React.memo(({ commentsMap }: Props) => {
  return (
    <>
      {commentsMap.map(({ parentComment, childComments }) => (
        <React.Fragment key={parentComment.id}>
          <CommentCard comment={parentComment} />
          {childComments.map((childComment) => (
            <CommentCard asChild key={childComment.id} comment={childComment} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
});

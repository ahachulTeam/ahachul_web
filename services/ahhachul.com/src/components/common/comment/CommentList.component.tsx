import React from 'react';

import type { CommentList } from '@/types';

import Comment from './commentListItem/CommentListItem.component';
import EmptyCommentList from './emptyCommentList/EmptyCommentList.component';

interface BaseCommentListProps {
  commentsMap: CommentList['comments'];
}

const BaseCommentList = React.memo(({ commentsMap }: BaseCommentListProps) => {
  if (commentsMap.length === 0) return <EmptyCommentList />;

  return (
    <>
      {commentsMap.map(({ parentComment, childComments }) => (
        <React.Fragment key={parentComment.id}>
          <Comment comment={parentComment} />
          {childComments.map(childComment => (
            <Comment asChild key={childComment.id} comment={childComment} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
});

BaseCommentList.displayName = 'BaseCommentList';

export default BaseCommentList;

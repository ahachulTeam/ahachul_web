import React, { useEffect } from 'react';

import { useTempComment } from '@/stores/comment';
import type { CommentList } from '@/types';

import Comment from './commentListItem/CommentListItem.component';
import EmptyCommentList from './emptyCommentList/EmptyCommentList.component';

interface BaseCommentListProps {
  commentsMap: CommentList['comments'];
  servicePath: string;
  queryKey: readonly unknown[];
}

const BaseCommentList = React.memo(
  ({ queryKey, servicePath, commentsMap }: BaseCommentListProps) => {
    const { setTempComment } = useTempComment();

    useEffect(() => setTempComment(commentsMap), [commentsMap]);

    if (commentsMap.length === 0) return <EmptyCommentList />;

    return (
      <>
        {commentsMap.map(({ parentComment, childComments }) => (
          <React.Fragment key={parentComment.id}>
            <Comment comment={parentComment} queryKey={queryKey} servicePath={servicePath} />
            {childComments.map(childComment => (
              <Comment
                asChild
                key={childComment.id}
                comment={childComment}
                queryKey={queryKey}
                servicePath={servicePath}
              />
            ))}
          </React.Fragment>
        ))}
      </>
    );
  },
);

BaseCommentList.displayName = 'BaseCommentList';

export default BaseCommentList;

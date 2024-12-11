import React, { type HTMLAttributes } from 'react';
import type { CommentList } from 'features/comments/model';
import * as styles from './BaseCommentList.css';
import { CommentCard } from './CommentCard';
import EmptyCommentList from './EmptyCommentList';

interface BaseCommentListProps extends HTMLAttributes<HTMLUListElement> {
  commentsMap: CommentList['comments'];
}

export const BaseCommentList = React.memo(
  ({ commentsMap, ...props }: BaseCommentListProps) => {
    if (commentsMap.length === 0) return <EmptyCommentList {...props} />;

    return (
      <ul css={styles.comments} {...props}>
        {commentsMap.map(({ parentComment, childComments }) => (
          <React.Fragment key={parentComment.id}>
            <CommentCard comment={parentComment} />
            {childComments.map((childComment) => (
              <CommentCard
                asChild
                key={childComment.id}
                comment={childComment}
              />
            ))}
          </React.Fragment>
        ))}
      </ul>
    );
  },
);

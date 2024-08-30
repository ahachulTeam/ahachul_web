import React, { type HTMLAttributes } from 'react';
import type { CommentList } from 'features/comments/model';
import * as styles from './BaseCommentList.css';
import { CommentCard } from './CommentCard';

interface BaseCommentListProps extends HTMLAttributes<HTMLUListElement> {
  commentsMap: CommentList['comments'];
}
export const BaseCommentList = React.memo(
  ({ commentsMap, ...props }: BaseCommentListProps) => {
    return (
      <ul css={styles.comments} {...props}>
        {commentsMap.map(({ parentComment, childComments }) => (
          <>
            <CommentCard key={parentComment.id} comment={parentComment} />
            {childComments?.map((childComment) => (
              <CommentCard
                asChild
                key={childComment.id}
                comment={childComment}
              />
            ))}
          </>
        ))}
      </ul>
    );
  },
);

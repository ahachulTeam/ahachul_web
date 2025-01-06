import React from 'react';
import { Flex } from '@ahhachul/react-components-layout';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import * as styles from './CommentCard.css';
import * as listStyles from './BaseCommentList.css';
import { BaseSkeleton } from 'shared/ui/Skeleton/Skeleton';
import { useIsDeferred } from 'shared/lib/hooks/useIsDeferred';

const CommentListSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred();

  return !isDeferred ? (
    <ul css={listStyles.comments}>
      {new Array(5).fill('').map((_, idx) => (
        <Flex key={idx} as="li" direction="column" css={styles.wrap(false)}>
          <Flex as="article" direction="column">
            <Flex justify="space-between" align="center">
              <BaseSkeleton width={50} height={14} radius={6} />
              <EllipsisIcon />
            </Flex>
            <BaseSkeleton width={150} height={32} radius={6} />
          </Flex>
        </Flex>
      ))}
    </ul>
  ) : null;
};

export default CommentListSuspenseFallback;

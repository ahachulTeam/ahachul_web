import { useIsDeferred } from 'shared/lib/hooks/useIsDeferred';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import { BaseSkeleton } from 'shared/ui/Skeleton/Skeleton';

import * as listStyles from './BaseCommentList.css';
import * as styles from './CommentCard.css';

const CommentListSuspenseFallback = () => {
  const { isDeferred } = useIsDeferred();

  return !isDeferred ? (
    <ul css={listStyles.comments}>
      {new Array(5).fill('').map((_, idx) => (
        <li key={idx} css={styles.wrap(false)}>
          <article style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <BaseSkeleton width={50} height={14} radius={6} />
              <EllipsisIcon />
            </div>
            <BaseSkeleton width={150} height={32} radius={6} />
          </article>
        </li>
      ))}
    </ul>
  ) : null;
};

export default CommentListSuspenseFallback;

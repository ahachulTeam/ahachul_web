import { Link } from 'app/stackflow';
import { ChatIcon } from 'widgets/layout-header/static/icons/chat';
import { UserIcon } from 'widgets/layout-header/static/icons/user';
import * as styles from './LayoutHeaderRightContent.css';

export const LayoutHeaderRightContent = () => {
  return (
    <div css={styles.right}>
      <Link activityName="SignIn" activityParams={{}}>
        <ChatIcon />
      </Link>
      <Link activityName="SignIn" activityParams={{}}>
        <UserIcon />
      </Link>
    </div>
  );
};

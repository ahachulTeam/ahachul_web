import { Link } from 'app/stackflow';
import { useAuthStore } from 'entities/app-authentications/slice';
import { ChatIcon } from 'widgets/layout-header/static/icons/chat';
import { UserIcon } from 'widgets/layout-header/static/icons/user';

import * as styles from './LayoutHeaderRightContent.css';

export const LayoutHeaderRightContent = () => {
  const { auth } = useAuthStore();

  return (
    <div css={styles.right}>
      <Link activityName={auth ? 'MyPage' : 'SignIn'} activityParams={{}}>
        <ChatIcon />
      </Link>
      <Link activityName={auth ? 'MyPage' : 'SignIn'} activityParams={{}}>
        <UserIcon />
      </Link>
    </div>
  );
};

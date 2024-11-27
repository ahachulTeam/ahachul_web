import { Link } from 'app/stackflow';
import { ChatIcon } from 'widgets/layout-header/static/icons/chat';
import { UserIcon } from 'widgets/layout-header/static/icons/user';
import * as styles from './LayoutHeaderRightContent.css';
import { useAuthStore } from 'entities/app-authentications/slice';

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

import AlarmIcon from 'widgets/layout-header/static/icons/alarm';
import SearchIcon from 'widgets/layout-header/static/icons/search';
import * as styles from './LayoutHeaderRightContent.css';

export const LayoutHeaderRightContent = () => (
  <div css={styles.right}>
    <AlarmIcon />
    <SearchIcon />
    {/* <img src={mock} alt="user-profile-image" /> */}
  </div>
);

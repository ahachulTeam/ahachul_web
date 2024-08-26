import React from 'react';
import { useNavItem } from 'widgets/navigation-item/lib/useNavItem';
import { type NavItem as TabItem } from 'widgets/navigation-item/model';
import * as styles from './NavItem.css';

interface TabItemProps {
  tab: TabItem;
  scrollToTop: VoidFunction;
}

export const NavItem: React.FC<TabItemProps> = ({ tab, scrollToTop }) => {
  const { isSame, handleTabClick } = useNavItem({ tab, scrollToTop });

  return (
    <div css={styles.wrap(isSame)}>
      <button onClick={handleTabClick}>
        {tab.icon()}
        <span>{tab.label}</span>
      </button>
    </div>
  );
};

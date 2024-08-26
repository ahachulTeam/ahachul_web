import React from 'react';
import { useNavItem } from 'widgets/navigation-item/lib/useNavItem';
import { type NavItem as TabItem } from 'widgets/navigation-item/model';
import * as styles from './NavItem.css';

interface TabItemProps {
  tab: TabItem;
  callbackFn_whenIsSame?: VoidFunction;
}

export const NavItem: React.FC<TabItemProps> = ({ tab, callbackFn_whenIsSame }) => {
  const { isSame, handleTabClick } = useNavItem({ tab, callbackFn_whenIsSame });

  return (
    <div css={styles.wrap(isSame)}>
      <button onClick={handleTabClick}>
        {tab.icon()}
        <span>{tab.label}</span>
      </button>
    </div>
  );
};

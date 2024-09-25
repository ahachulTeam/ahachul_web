import React from 'react';
import { Link } from 'app/stackflow';
import { useNavItem } from 'widgets/navigation-item/lib/useNavItem';
import type { NavType } from 'widgets/navigation/data';
import PlusIcon from '../static/icons/PlusIcon';
import * as styles from './NavItem.css';

interface TabItemProps {
  tab: NavType;
  handleScrollToTop?: VoidFunction;
}

export const NavItem = ({ tab, handleScrollToTop }: TabItemProps) => {
  const { isSame, handleTabClick } = useNavItem({ tab, handleScrollToTop });

  return (
    <div css={styles.wrap(isSame)}>
      <button onClick={handleTabClick}>
        {tab.icon()}
        <span>{tab.label}</span>
      </button>
      {isSame && tab.createPageOptions?.to && (
        <Link
          css={styles.plusBtn}
          activityParams={{}}
          activityName={tab.createPageOptions.to}
        >
          <PlusIcon />
        </Link>
      )}
    </div>
  );
};

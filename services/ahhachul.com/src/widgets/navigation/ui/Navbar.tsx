import React from 'react';
import { NavItem } from 'widgets/navigation-item/ui/NavItem';
import * as styles from './Navbar.css';
import { navlist } from '../data';

interface BottomNavbarProps {
  scrollToTop: VoidFunction;
}

export const BottomNavbar = ({ scrollToTop }: BottomNavbarProps) => {
  return (
    <nav css={styles.navbar}>
      {navlist.map((tab) => {
        const props = { tab, scrollToTop };
        return <NavItem key={tab.label} {...props} />;
      })}
    </nav>
  );
};

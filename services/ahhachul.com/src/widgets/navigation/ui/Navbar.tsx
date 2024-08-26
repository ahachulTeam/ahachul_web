import React from 'react';
import { NavItem } from 'widgets/navigation-item/ui/NavItem';
import * as styles from './Navbar.css';
import { navlist } from '../data';

interface NavbarProps {
  callbackFn_whenIsSame?: VoidFunction;
}

export const Navbar = ({ callbackFn_whenIsSame }: NavbarProps) => {
  return (
    <nav css={styles.navbar}>
      {navlist.map((tab) => {
        const props = { tab, callbackFn_whenIsSame };
        return <NavItem key={tab.label} {...props} />;
      })}
    </nav>
  );
};

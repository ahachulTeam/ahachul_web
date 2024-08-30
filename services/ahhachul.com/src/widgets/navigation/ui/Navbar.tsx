import React from 'react';
import { NavItem } from 'widgets/navigation-item/ui/NavItem';
import { BottomDim } from 'shared/ui';
import { navlist } from '../data';
import * as styles from './Navbar.css';

interface NavbarProps {
  onTopClick?: VoidFunction;
}

export const Navbar = ({ onTopClick }: NavbarProps) => (
  <>
    <nav css={styles.navbar}>
      {navlist.map((tab) => {
        const props = { tab, onTopClick };
        return <NavItem key={tab.label} {...props} />;
      })}
    </nav>
    <BottomDim />
  </>
);

import React from 'react';
import { NavItem } from 'widgets/navigation-item/ui/NavItem';
import { BottomDim } from 'shared/ui';
import { ScrollCondition } from 'shared/lib/hooks/useScrollTracker';
import { navlist } from '../data';
import * as styles from './Navbar.css';

interface NavbarProps {
  condition: ScrollCondition;
  onTopClick?: VoidFunction;
}

export const Navbar = ({ condition, onTopClick }: NavbarProps) => {
  const visible = condition === 'upState';

  return (
    <>
      <nav css={styles.navbar(visible)}>
        {navlist.map((tab) => {
          const props = { tab, onTopClick };
          return <NavItem key={tab.label} {...props} />;
        })}
      </nav>
      <BottomDim />
    </>
  );
};

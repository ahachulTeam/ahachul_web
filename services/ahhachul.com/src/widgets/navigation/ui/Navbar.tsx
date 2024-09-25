import React, { type RefObject, useMemo, useCallback } from 'react';
import { NavItem } from 'widgets/navigation-item/ui/NavItem';
import { navlist } from 'widgets/navigation/data';
import { BottomDim } from 'shared/ui';
import {
  ScrollDirection,
  useScrollDirection,
} from 'shared/lib/hooks/useScrollDirection';
import * as styles from './Navbar.css';

interface NavbarProps {
  elementRef: RefObject<HTMLElement>;
  handleScrollToTop: () => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(
  ({ elementRef, handleScrollToTop }) => {
    const { scrollDir } = useScrollDirection(elementRef);

    const isVisible = useMemo(
      () => scrollDir === ScrollDirection.up,
      [scrollDir],
    );

    const renderNavItem = useCallback(
      (tab: (typeof navlist)[number]) => {
        const props = { tab, onTopClick: handleScrollToTop };
        return <NavItem key={tab.label} {...props} />;
      },
      [handleScrollToTop],
    );

    return (
      <>
        <nav css={styles.navbar(isVisible)} aria-hidden={!isVisible}>
          {navlist.map(renderNavItem)}
        </nav>
        <BottomDim />
      </>
    );
  },
);

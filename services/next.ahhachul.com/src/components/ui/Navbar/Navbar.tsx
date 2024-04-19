import React from 'react';

import { BOTTOM_NAVBAR_LIST } from '@/src/data';
import { wrap } from './style';
import TabItem from './NavbarItem';

interface BottomNavbarProps {
  scrollToTop: VoidFunction;
}

const BottomNavbar = ({ scrollToTop }: BottomNavbarProps) => {
  return (
    <nav css={wrap}>
      {BOTTOM_NAVBAR_LIST.map((item, index) => (
        <TabItem key={index} href={item?.href} Icon={item?.Icon} label={item?.label} scrollToTop={scrollToTop} />
      ))}
    </nav>
  );
};

export default BottomNavbar;

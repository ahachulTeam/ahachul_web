import React from 'react';

import { BOTTOM_NAVBAR_LIST } from '@/src/data';
import { wrap } from './style';
import { KeyOf } from '@/src/types/utility-types/KeyOf';
// import { TypeActivities } from 'stackflow';
import TabItem from './NavbarItem';

interface BottomNavbarProps {
  activeTab: KeyOf<any>;
  scrollToTop: VoidFunction;
}

const BottomNavbar = ({ activeTab, scrollToTop }: BottomNavbarProps) => {
  return (
    <nav css={wrap}>
      {BOTTOM_NAVBAR_LIST.map((item, index) => {
        return (
          <TabItem
            key={index}
            activeTab={activeTab}
            href={item?.href as KeyOf<any>}
            Icon={item?.Icon}
            label={item?.label}
            scrollToTop={scrollToTop}
          />
        );
      })}
    </nav>
  );
};

export default BottomNavbar;

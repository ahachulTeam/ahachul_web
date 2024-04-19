import React from 'react';

import { BOTTOM_NAVBAR_LIST } from 'data';
import { wrap } from './style';
import { KeyOf } from 'types/utility-types/KeyOf';
import { TypeActivities } from 'stackflow';
import TabItem from './NavbarItem';

interface BottomNavbarProps {
  activeTab: KeyOf<TypeActivities>;
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
            href={item?.href as KeyOf<TypeActivities>}
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

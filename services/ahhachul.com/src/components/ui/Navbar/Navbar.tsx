import React from 'react';

import { BOTTOM_NAVBAR_LIST } from 'data';
import { wrap } from './style';
import { KeyOf } from 'types/utility-types/KeyOf';
import { TypeActivities } from 'stackflow';
import TabItem from './NavbarItem';

interface BottomNavbarProps {
  activeTab: KeyOf<TypeActivities>;
  push: (tab: KeyOf<TypeActivities>) => void;
  replace: (tab: KeyOf<TypeActivities>) => void;
  scrollToTop: VoidFunction;
}

const BottomNavbar = ({ activeTab, push, replace, scrollToTop }: BottomNavbarProps) => {
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
            push={push}
            replace={replace}
            scrollToTop={scrollToTop}
          />
        );
      })}
    </nav>
  );
};

export default BottomNavbar;

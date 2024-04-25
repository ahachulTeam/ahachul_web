import React from 'react';
import { type TypeActivities } from 'stackflow';

import { UiComponent } from 'components';
import { BOTTOM_NAVBAR_LIST } from 'data';
import { KeyOf } from 'types/utility-types/KeyOf';
import { wrap } from './style';
import TabItem from './NavbarItem';

interface BottomNavbarProps {
  activeTab: KeyOf<TypeActivities>;
  scrollToTop: VoidFunction;
}

const BottomNavbar = ({ activeTab, scrollToTop }: BottomNavbarProps) => {
  return (
    <>
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
      <UiComponent.BottomDim />
    </>
  );
};

export default BottomNavbar;

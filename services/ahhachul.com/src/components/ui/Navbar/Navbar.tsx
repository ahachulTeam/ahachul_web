import React from 'react';

import TabItem from './NavbarItem';
import { BOTTOM_NAVBAR_LIST } from 'data';
import { content, shadowWrap, wrap } from './style';
import { KeyOf } from 'types/utility-types/KeyOf';
import { TypeActivities } from 'stackflow';

interface BottomNavbarProps {
  activeTab: KeyOf<TypeActivities>;
  replace: (tab: KeyOf<TypeActivities>) => {
    activityId: string;
  };
  scrollToTop: VoidFunction;
}

const BottomNavbar = ({ activeTab, replace, scrollToTop }: BottomNavbarProps) => {
  return (
    <nav css={wrap}>
      <div css={shadowWrap}>
        <div css={content}>
          {BOTTOM_NAVBAR_LIST.map((item, index) => {
            return (
              <TabItem
                key={index}
                activeTab={activeTab}
                href={item?.href as KeyOf<TypeActivities>}
                Icon={item?.Icon}
                label={item?.label}
                replace={replace}
                scrollToTop={scrollToTop}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;

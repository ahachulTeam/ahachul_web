import React from 'react';

import { BottomNav } from '@ahhachul/ui';

import { UiComponent } from '@/components';

import { GNBList } from './Gnb.constant';
import { NavItem } from './navItem';

interface GnbProps {
  handleScrollToTop: () => void;
}

const Gnb = React.memo(({ handleScrollToTop }: GnbProps) => {
  return (
    <BottomNav itemCount={GNBList.length} bottomInset={<UiComponent.IOSBottomPadding />}>
      {GNBList.map(item => (
        <NavItem key={item.label} item={item} handleScrollToTop={handleScrollToTop} />
      ))}
    </BottomNav>
  );
});

Gnb.displayName = 'Gnb';

export default Gnb;

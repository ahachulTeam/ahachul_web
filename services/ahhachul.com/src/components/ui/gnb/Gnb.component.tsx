import React, { useMemo } from 'react';

import { UiComponent } from '@/components';
import { useScrollDirection } from '@/hooks';
import { ScrollDirection } from '@/types';

import { GNBList } from './Gnb.data';
import * as S from './Gnb.styled';
import { NavItem } from './navItem';

interface GnbProps {
  el: React.RefObject<HTMLElement>;
  handleScrollToTop: () => void;
}

// eslint-disable-next-line react/prop-types
const Gnb: React.FC<GnbProps> = React.memo(({ el, handleScrollToTop }) => {
  const scrollDir = useScrollDirection({ el });

  const showNavigationSlot = useMemo(() => scrollDir === ScrollDirection.up, [scrollDir]);

  return (
    <>
      <S.Navbar visible={showNavigationSlot}>
        {GNBList.map(item => (
          <NavItem key={item.label} item={item} handleScrollToTop={handleScrollToTop} />
        ))}
      </S.Navbar>
      <UiComponent.BottomDim />
    </>
  );
});

Gnb.displayName = 'Gnb';

export default Gnb;

import React from 'react';

import { GNBList } from './Gnb.constant';
import * as S from './Gnb.styled';
import { NavItem } from './navItem';

interface GnbProps {
  handleScrollToTop: () => void;
}

const Gnb = React.memo(({ handleScrollToTop }: GnbProps) => {
  return (
    <S.Navbar>
      {GNBList.map(item => (
        <NavItem key={item.label} item={item} handleScrollToTop={handleScrollToTop} />
      ))}
    </S.Navbar>
  );
});

Gnb.displayName = 'Gnb';

export default Gnb;

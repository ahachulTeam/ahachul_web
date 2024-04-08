import React from 'react';
// import { useFlow } from 'stackflow';
import IconHome from '@/src/static/icons/system/IconHome';

import { btn_wrap, wrap } from './style';

const HeaderSection = () => {
  // const { replace } = useFlow();
  // const routeToHome = () => replace('Home', {});

  return (
    <section css={wrap}>
      <ul css={btn_wrap}>
        <button>
          <IconHome />
          <span>홈</span>
        </button>
      </ul>
    </section>
  );
};

export default HeaderSection;

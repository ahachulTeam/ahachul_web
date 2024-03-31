import React from 'react';
import { useFlow } from 'stackflow';
import IconDndBar from 'static/icons/system/IconDndBar';
import IconHeart from 'static/icons/system/IconHeart';

import { btn_wrap, wrap } from './style';

const HeaderSection = () => {
  const { push } = useFlow();
  const routeToBlindDate = () => push('BlindDate', {});
  const routeToAllServices = () => push('AllServices', {});

  return (
    <section css={wrap}>
      <ul css={btn_wrap}>
        <button onClick={routeToAllServices}>
          <IconDndBar />
          <span>전체</span>
        </button>
        <button onClick={routeToBlindDate}>
          <IconHeart />
          <span>소개팅</span>
        </button>
      </ul>
    </section>
  );
};

export default HeaderSection;

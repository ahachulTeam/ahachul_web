import React from 'react';
import { useDispatch } from 'react-redux';
import { useFlow } from 'stackflow';
import IconDndBar from 'static/icons/system/IconDndBar';
import IconHeart from 'static/icons/system/IconHeart';
import IconSecondhand from 'static/icons/system/IconSecondhand';
import { addSnackBar } from 'stores/ui';

import { btn_wrap, wrap } from './style';

const HeaderSection = () => {
  const { push, replace } = useFlow();
  const routeToBlindDate = () => replace('BlindDate', {});
  const routeToAllServices = () => push('AllServices', {});

  const dispatch = useDispatch();
  const clickSecondhand = () => dispatch(addSnackBar({ message: '준비중이에요' }));

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
        <button onClick={clickSecondhand}>
          <IconSecondhand css={{ '& > svg > path': { fill: 'none !important' } }} />
          <span>중고거래</span>
        </button>
      </ul>
    </section>
  );
};

export default HeaderSection;

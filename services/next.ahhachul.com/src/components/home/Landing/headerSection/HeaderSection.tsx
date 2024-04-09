import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import IconDndBar from '@/src/static/icons/system/IconDndBar';
import IconHeart from '@/src/static/icons/system/IconHeart';
import IconSecondhand from '@/src/static/icons/system/IconSecondhand';
import { addSnackBar } from '@/src/stores/ui';

import { btn_wrap, wrap } from './style';
import { PATH } from '@/src/data';

const HeaderSection = () => {
  const { push } = useRouter();
  const routeToBlindDate = () => dispatch(addSnackBar({ message: '준비중이에요' }));
  const routeToAllServices = () => push(PATH.allServices);

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

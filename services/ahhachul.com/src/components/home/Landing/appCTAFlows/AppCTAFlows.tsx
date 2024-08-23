import React from 'react';
import { useDispatch } from 'react-redux';
import { useFlow } from 'stackflow';
import IconCar from 'shared/static/icons/system/IconCar';
import IconDndBar from 'shared/static/icons/system/IconDndBar';
import IconHeart from 'shared/static/icons/system/IconHeart';
import IconSecondhand from 'shared/static/icons/system/IconSecondhand';
import { addSnackBar } from 'stores/ui';

import { btn_wrap, wrap } from './style';

type OurCTAType = '전체' | '소개팅' | '중고거래' | '카셰어링';

const ourAppCTAFlowIsThis = [
  {
    title: '전체',
    icon: <IconDndBar />,
  },
  {
    title: '소개팅',
    icon: <IconHeart />,
  },
  {
    title: '중고거래',
    icon: <IconSecondhand />,
  },
  {
    title: '카셰어링',
    icon: <IconCar />,
  },
] satisfies {
  title: OurCTAType;
  icon: JSX.Element;
}[];

const AppCTAFlows = () => {
  const dispatch = useDispatch();
  const { push, replace } = useFlow();

  const handleClick = (title: OurCTAType) => () => {
    switch (title) {
      case '전체':
        push('AllServices', {});
        break;
      case '소개팅':
        replace('BlindDate', {});
        break;
      default:
        dispatch(addSnackBar({ message: '준비중이에요' }));
    }
  };

  return (
    <section css={wrap}>
      <ul css={btn_wrap}>
        {ourAppCTAFlowIsThis.map((stack) => (
          <button key={stack.title} onClick={handleClick(stack.title)}>
            {stack.icon}
            <span>{stack.title}</span>
          </button>
        ))}
      </ul>
    </section>
  );
};

export default AppCTAFlows;

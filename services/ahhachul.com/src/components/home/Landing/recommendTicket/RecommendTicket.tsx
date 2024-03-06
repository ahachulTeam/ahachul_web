import React from 'react';
import { useFlow } from 'stackflow';

import { wrap, title, card_wrap, info_wrap, package_badge, package_name, package_price } from './style';
import mockProfile from 'static/img/mocks/mock2.png';
import IconRecommendTicket from 'static/icons/system/IconRecommendTicket';
import IconPackage from 'static/icons/system/IconPackage';

const RecommendTicket = () => {
  const { push } = useFlow();

  const onClickToRegister = () => push('MyTicket', {});

  return (
    <div css={[wrap, { cursor: 'pointer' }]} onClick={onClickToRegister}>
      <h1 css={title}>
        <IconRecommendTicket /> <b>추천 이용권</b>
      </h1>
      <div css={card_wrap}>
        <img src={mockProfile} alt="" />
        <div css={info_wrap}>
          <div css={package_badge}>
            <IconPackage />
            <p>패키지</p>
          </div>
          <span css={package_name}>패키지 상품 이름 이용권 테스트 영역 2줄</span>
          <div css={package_price}>
            <span>600,000원</span>
            <span>1,200,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendTicket;

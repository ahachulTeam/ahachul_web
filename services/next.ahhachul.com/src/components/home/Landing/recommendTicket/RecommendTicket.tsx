import React from 'react';
// import { useFlow } from 'stackflow';

import { wrap, title, card_wrap, info_wrap, package_badge, package_name, package_price } from './style';
// import mockProfile from '@/src/static/img/mocks/mock2.png';
import IconRecommendTicket from '@/src/static/icons/system/IconRecommendTicket';
import IconPackage from '@/src/static/icons/system/IconPackage';

const RecommendTicket = () => {
  // const { push } = useFlow();

  // const onClickToRegister = () => push('MyTicket', {});

  return (
    <div css={[wrap, { cursor: 'pointer' }]}>
      <h1 css={title}>
        <IconRecommendTicket /> <b>추천 아하철 티켓</b>
      </h1>
      <div css={card_wrap}>
        {/* <img src={mockProfile} alt="" /> */}
        <div css={info_wrap}>
          <div css={package_badge}>
            <IconPackage />
            <p>패키지</p>
          </div>
          <span css={package_name}>아하철 + 코레일 패키지</span>
          <div css={package_price}>
            <span>60,000원</span>
            <span>100,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendTicket;

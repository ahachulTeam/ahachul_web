import React from 'react';
// import { useFlow } from 'stackflow';

import { wrap, title } from './style';

const HeaderSection = () => {
  // const { push } = useFlow();
  // const [show, toggle] = useReducer((c) => !c, false);
  // const onClickToRegister = () => push('RegisterCenter', {});

  return (
    <div css={wrap}>
      <h1 css={title}>
        <b>이효범님,</b>
        현재 <b>열차정보와 혼잡도</b>를 알려드려요!
      </h1>
      {/* <div css={btn_wrap}>
        <button css={registCenter} onClick={onClickToRegister}>
          <IconSearch />
          <span>나만의 역 등록</span>
        </button>
        <button css={mobileTicket} onClick={toggle}>
          <IconQRCode />
          <span>노선도 보기</span>
        </button>
      </div>
      <div css={[banner, { cursor: 'pointer' }]}>
        <div css={bannerTextGroup}>
          <p>아하철 블랙 티켓</p>
          <p>블랙 티켓 등록하고 아하철 이용하자!</p>
        </div>
        <IconBack css={bannerIcon} />
      </div> */}
    </div>
  );
};

export default HeaderSection;

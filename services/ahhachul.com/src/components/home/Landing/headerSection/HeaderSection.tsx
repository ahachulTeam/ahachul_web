import React, { useReducer } from 'react';
import { useFlow } from 'stackflow';

import IconSearch from 'static/icons/system/IconSearch';
import IconQRCode from 'static/icons/system/IconQRCode';
import IconBack from 'static/icons/system/IconBack';
import { wrap, title, btn_wrap, registCenter, mobileTicket, banner, bannerTextGroup, bannerIcon } from './style';
import { MobileTicketBottomSheet } from '../bottomSheet';

const HeaderSection = () => {
  const { push } = useFlow();
  const [show, toggle] = useReducer((c) => !c, false);
  const onClickToRegister = () => push('RegisterCenter', {});

  return (
    <div css={wrap}>
      <h1 css={title}>
        이효범님<b>함께 화이팅해요! 💪🏻</b>
      </h1>
      <div css={btn_wrap}>
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
      </div>
      <MobileTicketBottomSheet isShowing={show} onClose={toggle} />
    </div>
  );
};

export default HeaderSection;

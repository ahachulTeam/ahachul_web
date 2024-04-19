import React from 'react';
// import { useFlow } from 'stackflow';

import IconMyTicket from '@/src/static/icons/system/IconMyTicket';
import IconBack from '@/src/static/icons/system/IconBack';
import {
  wrap,
  head_section,
  title,
  tickets_wrap,
  info_wrap,
  card_wrap,
  card_top,
  times,
  lesson_name,
  package_info,
  ticket_name,
  card_bottom,
  labels,
  bannerIcon,
} from './style';

import IconGoto from '@/src/static/icons/mocks/IconGoto';

const MyTicket = () => {
  // const { push } = useFlow();

  // const onClickToRegister = () => push('MyTicket', {});

  return (
    <div css={wrap}>
      <div css={head_section}>
        <h1 css={title}>
          <IconMyTicket />
          <span>
            보유한 티켓 <b>1</b>
          </span>
        </h1>
        <button>더보기</button>
      </div>
      <div css={tickets_wrap}>
        <div css={info_wrap}>
          <IconGoto />
          <span>아하철 피트니스</span>
          <p>이용중</p>
        </div>
        <div css={card_wrap}>
          <div css={card_top}>
            <div css={package_info}>
              <div>
                <span>그룹수업</span>
                <span>·</span>
                <span>아하철 GX</span>
              </div>
            </div>
            <p css={lesson_name}>VIP를 위한 여름 다이어트</p>
            <div css={times}>
              <span>2024.02.26</span>
              <span>-</span>
              <span>2024.08.26</span>
            </div>
            <span css={ticket_name}>아하철과 고투가 함께하는 다이어트 필승 공략 티켓</span>
          </div>
          <div css={card_bottom}>
            <div css={labels}>
              <span>213일 남음</span>
              <span>주간 2회 남음</span>
            </div>
            <IconBack css={bannerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTicket;

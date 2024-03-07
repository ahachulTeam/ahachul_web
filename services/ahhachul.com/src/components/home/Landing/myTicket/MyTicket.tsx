import React from 'react';
import { useFlow } from 'stackflow';

import IconMyTicket from 'static/icons/system/IconMyTicket';
import IconBack from 'static/icons/system/IconBack';
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

import IconGoto from 'static/icons/mocks/IconGoto';
import IconBpayLong from 'static/icons/system/IconBPayLong';

const MyTicket = () => {
  const { push } = useFlow();

  const onClickToRegister = () => push('MyTicket', {});

  return (
    <div css={wrap}>
      <div css={head_section}>
        <h1 css={title}>
          <IconMyTicket />
          <span>
            보유한 이용권 <b>3</b>
          </span>
        </h1>
        <button onClick={onClickToRegister}>더보기</button>
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
                <span>아하철 필라테스</span>
              </div>
              <IconBpayLong />
            </div>
            <p css={lesson_name}>VIP를 위한 여름 다이어트다이어 2줄일때</p>
            <div css={times}>
              <span>2020.08.26</span>
              <span>-</span>
              <span>2021.08.26</span>
            </div>
            <span css={ticket_name}>이용권 상품명이용권 상품명 이용권 상품명이용권 상품명</span>
          </div>
          <div css={card_bottom}>
            <div css={labels}>
              <span>180일 남음</span>
              <span>27회 남음</span>
              <span>주간 7회 남음</span>
            </div>
            <IconBack css={bannerIcon} onClick={onClickToRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTicket;

import React from 'react';

import { useFlow } from 'stackflow';
import IconReservedClass from 'static/icons/system/IconReservedClass';
import { wrap, headSection, title, ul, card_wrap, info_wrap, times, lesson_name, package_info, btn } from './style';

const ReservedClass = () => {
  const { replace } = useFlow();

  const onClickToReservation = () => replace('Complaints', {}, { animate: false });

  return (
    <div css={[wrap, { cursor: 'pointer' }]}>
      <div css={headSection}>
        <h1 css={title}>
          <IconReservedClass />
          <span>
            예약된 수업 <b>3</b>
          </span>
        </h1>
        <button onClick={onClickToReservation}>더보기</button>
      </div>
      <ul css={ul}>
        <div css={card_wrap}>
          <div css={info_wrap}>
            <div css={times}>
              <span>2.21 (수)</span>
              <span>오전 11:00 - 11:50</span>
            </div>
            <div css={lesson_name}>
              <span>필라테스 중급 필라테스 중급...</span>
              <div>
                <span>손예진</span>
                <span>12번</span>
              </div>
            </div>
            <div css={package_info}>
              <span>그룹</span>
              <span>·</span>
              <span>아하철 교대점</span>
            </div>
          </div>
          <button css={btn}>예약취소</button>
        </div>
        <div css={card_wrap}>
          <div css={info_wrap}>
            <div css={times}>
              <span>2.21 (수)</span>
              <span>오전 11:00 - 11:50</span>
            </div>
            <div css={lesson_name}>
              <span>필라테스 중급 필라테스 중급...</span>
              <div>
                <span>손예진</span>
                <span>12번</span>
              </div>
            </div>
            <div css={package_info}>
              <span>그룹</span>
              <span>·</span>
              <span>아하철 교대점</span>
            </div>
          </div>
          <button css={btn}>예약취소</button>
        </div>
        <div css={card_wrap}>
          <div css={info_wrap}>
            <div css={times}>
              <span>2.21 (수)</span>
              <span>오전 11:00 - 11:50</span>
            </div>
            <div css={lesson_name}>
              <span>필라테스 중급 필라테스 중급...</span>
              <div>
                <span>손예진</span>
                <span>12번</span>
              </div>
            </div>
            <div css={package_info}>
              <span>그룹</span>
              <span>·</span>
              <span>아하철 교대점</span>
            </div>
          </div>
          <button css={btn}>예약취소</button>
        </div>
      </ul>
    </div>
  );
};

export default ReservedClass;

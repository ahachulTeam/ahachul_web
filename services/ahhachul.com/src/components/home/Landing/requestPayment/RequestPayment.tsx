import React from 'react';
import { useFlow } from 'stackflow';

import { theme } from 'shared/style';
import IconRequestPayment from 'shared/static/icons/system/IconRequestPayment';
import { Divider } from 'components/ui';
import { wrap, title, card_wrap, info_wrap, payment_info, resson_info, bpay, paymentIcon } from './style';
import IconPayment from 'shared/static/icons/system/IconPayment';
import mockProfile from 'static/img/mocks/photo.png';

const RequestPayment = () => {
  const { replace } = useFlow();

  const onClickToRegister = () => replace('Lost', {}, { animate: false });

  return (
    <div css={wrap}>
      <h1 css={title}>
        <IconRequestPayment /> <b>보상이 도착했어요!</b>
      </h1>
      <div css={card_wrap}>
        <div css={info_wrap}>
          <div css={payment_info}>
            <img src={mockProfile} alt="" />
            <div>
              <span>수락요청</span>
              <span>정미리 회원님</span>
            </div>
            <p>D-7</p>
          </div>
          <Divider color={theme.color.gray[300]} />
          <div css={resson_info}>
            <span>유실물</span>
            <span css={{ margin: '0 4px' }}>·</span>
            <span>아이폰 15 프로 512GB 실버</span>
          </div>
        </div>

        <button css={bpay} onClick={onClickToRegister}>
          <IconPayment css={paymentIcon} />
          <span>아하철에서 보상 받기</span>
        </button>
      </div>
    </div>
  );
};

export default RequestPayment;

import React from 'react';
import { useFlow } from 'stackflow';

import { theme } from 'styles';
import IconRequestPayment from 'static/icons/system/IconRequestPayment';
import { Divider } from 'components/ui';
import { wrap, title, card_wrap, info_wrap, payment_info, resson_info, bpay, paymentIcon } from './style';
import IconPayment from 'static/icons/system/IconPayment';
import mockProfile from 'static/img/mocks/photo.png';

const RequestPayment = () => {
  const { replace } = useFlow();

  const onClickToRegister = () => replace('Lost', {}, { animate: false });

  return (
    <div css={wrap}>
      <h1 css={title}>
        <IconRequestPayment /> <b>결제 요청이 도착했어요!</b>
      </h1>
      <div css={card_wrap}>
        <div css={info_wrap}>
          <div css={payment_info}>
            <img src={mockProfile} alt="" />
            <div>
              <span>결제요청</span>
              <span>정미리 강사님</span>
            </div>
            <p>D-7</p>
          </div>
          <Divider color={theme.color.sub.gray_eaeaea} />
          <div css={resson_info}>
            <span>개인레슨</span>
            <span>·</span>
            <span>필라테스 개인레슨 3개월 10회</span>
          </div>
        </div>

        <button css={bpay} onClick={onClickToRegister}>
          <IconPayment css={paymentIcon} />
          <span>아하철에서 바로 결제</span>
        </button>
      </div>
    </div>
  );
};

export default RequestPayment;

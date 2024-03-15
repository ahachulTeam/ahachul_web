import React, { useReducer } from 'react';
import { useFlow } from 'stackflow';

import IconSearch from 'static/icons/system/IconSearch';
import IconQRCode from 'static/icons/system/IconQRCode';
import IconBack from 'static/icons/system/IconBack';
import { wrap, title, btn_wrap, registCenter, mobileTicket, banner, bannerTextGroup, bannerIcon } from './style';
import { MobileTicketBottomSheet } from '../bottomSheet';
import { useModal } from 'hooks';
import { UiComponent } from 'components';

const HeaderSection = () => {
  const { push } = useFlow();
  const [show, toggle] = useReducer((c) => !c, false);
  const onClickToRegister = () => push('RegisterCenter', {});

  // const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const openSnackbar = () => {
    openModal();
    // dispatch(addSnackBar({ message: 'hello' }));
  };

  const onFinish = () => {
    console.log('onFinish');
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <div css={wrap}>
      <h1 css={title}>
        이효범님<b>함께 화이팅해요! 💪🏻</b>
      </h1>
      <div css={btn_wrap}>
        <button css={registCenter} onClick={onClickToRegister}>
          <IconSearch />
          <span>센터등록</span>
        </button>
        <button css={mobileTicket} onClick={toggle}>
          <IconQRCode />
          <span>모바일 회원증</span>
        </button>
      </div>
      <div css={[banner, { cursor: 'pointer' }]} onClick={openSnackbar}>
        <div css={bannerTextGroup}>
          <p>아하철 블랙 필라테스</p>
          <p>블랙라벨 블랙블랙 레깅스 1+1 반값특가!</p>
        </div>
        <IconBack css={bannerIcon} />
      </div>
      <MobileTicketBottomSheet isShowing={show} onClose={toggle} />
      <UiComponent.Dialog
        title="타이틀입니다"
        content="내용입니다"
        confirmText="끝내기"
        cancelText="취소"
        isOpen={isOpen}
        onClose={closeModal}
        onCancel={onCancel}
        onConfirm={onFinish}
      />
    </div>
  );
};

export default HeaderSection;

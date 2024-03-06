import React from 'react';
import { BottomSheet } from 'components/ui';

import { top, card } from './style';
import IconClose from 'static/icons/system/IconClose';

interface Props {
  isShowing: boolean;
  onClose: VoidFunction;
}

function MobileTicketBottomSheet(props: Props) {
  return (
    <BottomSheet isShowing={props.isShowing} onClickOutside={props.onClose} isDraggable isFullHeight header={false}>
      <div css={{ position: 'relative' }}>
        <div css={top}>
          <span>모바일 회원증</span>
          <IconClose onClick={props.onClose} />
          <div />
        </div>
        <div css={card}></div>
      </div>
      <div></div>
    </BottomSheet>
  );
}

export default MobileTicketBottomSheet;

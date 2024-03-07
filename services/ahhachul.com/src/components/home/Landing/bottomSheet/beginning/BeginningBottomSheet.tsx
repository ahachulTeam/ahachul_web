import React from 'react';
import { BottomSheet } from 'components/ui';

import IconClose from 'static/icons/system/IconClose';
import { top, content } from './style';

interface Props {
  isShowing: boolean;
  onClose: VoidFunction;
}

function BeginningBottomSheet(props: Props) {
  return (
    <BottomSheet isShowing={props.isShowing} onClickOutside={props.onClose} header hasIOSIndicatorArea isDraggable>
      <div css={top}>
        <span>쿠폰이 도착했어요! 🎉</span>
        <IconClose onClick={props.onClose} />
      </div>
      <div css={content}></div>
    </BottomSheet>
  );
}

export default BeginningBottomSheet;

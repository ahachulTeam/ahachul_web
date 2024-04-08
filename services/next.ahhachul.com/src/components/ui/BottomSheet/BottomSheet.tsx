import React, { type PropsWithChildren } from 'react';
import { BottomSheet as SpringBottomSheet } from 'react-spring-bottom-sheet';

import 'react-spring-bottom-sheet/dist/style.css';
import { nonDraggableCss, zIndexCss, contentCss, bottomSheetCss, safeAreaCss, indicatorAreaCss } from './style';

/**
 * @description
 * 화면 하단에서 올라오며 연관된 컨텐츠를 제공하기 위해 사용하는 컴포넌트 입니다.
 * 기존의 컨텍스트에서 벗어나지 않고 연관된 작업을 빠르게 프로세스하는 느낌을 유저에게 전달합니다.
 * @param onClickOutside  scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
 */
interface Props extends PropsWithChildren {
  header?: boolean;
  isShowing: boolean;
  isDraggable?: boolean;
  isFullHeight?: boolean;
  hasSafeArea?: boolean;
  hasIOSIndicatorArea?: boolean;
  onClickOutside?: VoidFunction;
}

function BottomSheet({
  children,
  isShowing,
  header = true,
  isDraggable = false,
  isFullHeight = false,
  hasSafeArea = false,
  hasIOSIndicatorArea = false,
  onClickOutside,
}: Props) {
  return (
    <SpringBottomSheet
      open={isShowing}
      css={[bottomSheetCss, isDraggable ? {} : nonDraggableCss, zIndexCss]}
      onDismiss={onClickOutside}
      header={header}
    >
      <div css={contentCss(isFullHeight)}>{children}</div>
      {hasSafeArea && <div css={safeAreaCss} />}
      {hasIOSIndicatorArea && <div css={indicatorAreaCss} />}
    </SpringBottomSheet>
  );
}

export default BottomSheet;

import React, { type ComponentProps, useRef, useMemo, useCallback } from 'react';

import { UiComponent } from '..';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useShallow } from 'zustand/react/shallow';

import { uiStore } from '@/stores';

import * as S from './BaseLayout.styled';

interface LayoutProps extends ComponentProps<typeof AppScreen> {
  navigationSlot?: boolean;
}

const BaseLayout: React.FC<LayoutProps> = ({
  appBar,
  children,
  navigationSlot,
  backgroundColor,
  ...props
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const globalLoading = uiStore(useShallow(state => state.globalLoading));

  const handleScrollToTop = useCallback(() => {
    scrollableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const customAppBar = useMemo(
    () => ({
      ...appBar,
      // iconColor: themes.color.text[50],
      // textColor: themes.color.text[50],
      onTopClick: handleScrollToTop,
    }),
    [appBar, handleScrollToTop],
  );

  const navbarConfig = useMemo(
    () => ({
      el: scrollableRef,
      handleScrollToTop,
    }),
    [handleScrollToTop],
  );

  return (
    <AppScreen appBar={customAppBar} backgroundColor={backgroundColor} {...props}>
      <S.Main>
        <S.Scrollable ref={scrollableRef} navigationSlot={!!navigationSlot}>
          {children}
        </S.Scrollable>
      </S.Main>
      {globalLoading && <UiComponent.LoadingSpinner />}
      {navigationSlot && <UiComponent.GNB {...navbarConfig} />}
    </AppScreen>
  );
};

export default BaseLayout;

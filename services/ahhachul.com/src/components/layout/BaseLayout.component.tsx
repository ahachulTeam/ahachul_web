import React, { type ComponentProps, useRef, useMemo, useCallback } from 'react';

import { UiComponent } from '..';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useShallow } from 'zustand/react/shallow';

import { uiStore } from '@/stores';
import { theme } from '@/styles';

import * as S from './BaseLayout.styled';

interface LayoutProps extends ComponentProps<typeof AppScreen> {
  navigationSlot?: boolean;
}

const BaseLayout: React.FC<LayoutProps> = ({
  appBar,
  children,
  navigationSlot,
  backgroundColor = theme.colors.white,
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
      onTopClick: handleScrollToTop,
    }),
    [appBar, handleScrollToTop],
  );

  return (
    <AppScreen appBar={customAppBar} backgroundColor={backgroundColor} {...props}>
      <S.Main>
        <S.Scrollable ref={scrollableRef} navigationSlot={!!navigationSlot}>
          {children}
        </S.Scrollable>
      </S.Main>
      {globalLoading && <UiComponent.LoadingSpinner />}
      {navigationSlot && <UiComponent.GNB handleScrollToTop={handleScrollToTop} />}
    </AppScreen>
  );
};

export default BaseLayout;

import React, { useCallback, type PropsWithChildren } from 'react';

import { UiComponent } from '@/src/components';
import { useAppSelector } from '@/src/stores';
import { scrollable } from './style';

interface LayoutProps {
  headerType?: 'default' | 'search' | 'back';
  title?: string;
  nav?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  headerType = 'default',
  title = '',
  nav = true,
  children,
}) => {
  const { loading, snackBars } = useAppSelector((state) => state.ui);

  const scrollToTop = useCallback(
    () => window?.scrollTo?.({ top: 0, behavior: 'smooth' }),
    [],
  );

  return (
    <>
      <UiComponent.Header headerType={headerType} title={title} />
      <UiComponent.SnackBar {...snackBars} />
      {loading.active && <UiComponent.Loading opacity={loading.opacity} />}
      <main css={scrollable(nav)}>{children}</main>
      {nav && (
        <>
          <UiComponent.NavBar scrollToTop={scrollToTop} />
          <UiComponent.BottomDim />
        </>
      )}
    </>
  );
};

export default Layout;

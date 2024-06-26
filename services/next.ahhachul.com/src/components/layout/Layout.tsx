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

  const scrollToTop = useCallback(() => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <UiComponent.Header headerType={headerType} title={title} />
      <main css={scrollable(nav)}>{children}</main>
      <UiComponent.SnackBar {...snackBars} />
      {nav && <UiComponent.NavBar scrollToTop={scrollToTop} />}
      {loading.active && <UiComponent.Loading opacity={loading.opacity} />}
    </>
  );
};

export default Layout;

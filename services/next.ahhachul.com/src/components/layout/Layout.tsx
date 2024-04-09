import { useAppSelector } from '@/src/stores';
import React, { useCallback, type PropsWithChildren } from 'react';
import { UiComponent } from '..';
import { scrollable } from './style';

interface LayoutProps {
  headerType?: 'default' | 'search' | 'back';
  nav?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ headerType = 'default', nav = true, children }) => {
  console.log('headerType:', headerType);

  const { loading, snackBars } = useAppSelector((state) => state.ui);

  const scrollToTop = useCallback(() => {
    if (!window) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <main css={scrollable(nav)}>{children}</main>
      <UiComponent.SnackBar {...snackBars} />
      {nav && <UiComponent.BottomDim />}
      {nav && <UiComponent.NavBar scrollToTop={scrollToTop} />}
      {loading.active && <UiComponent.Loading opacity={loading.opacity} />}
    </>
  );
};

export default Layout;

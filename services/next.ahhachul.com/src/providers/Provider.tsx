import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ThemeProvider, Global } from '@emotion/react';

import { store } from '@/src/stores';
import { theme, global } from '@/src/styles';

import ThemeScript from './ThemeScript';
import QueryProvider from './QueryProvider';
import { AuthProvider } from './AuthProvider';

function AppProvider({
  pageProps,
  children,
}: PropsWithChildren<{ pageProps: AppProps['pageProps'] }>) {
  return (
    <>
      <ThemeScript />
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryProvider pageProps={pageProps}>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;

import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from '@/src/stores';
import { theme, global } from '@/src/styles';
import QueryProvider from './QueryProvider';
import ThemeScript from './ThemeScript';
import type { AppProps } from 'next/app';

function AppProvider({ pageProps, children }: PropsWithChildren<{ pageProps: AppProps['pageProps'] }>) {
  return (
    <>
      <ThemeScript />
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryProvider pageProps={pageProps}>{children}</QueryProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;

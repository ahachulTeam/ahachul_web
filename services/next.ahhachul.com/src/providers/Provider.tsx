import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from '@/src/stores';
import { theme, global } from '@/src/styles';
import QueryProvider from './QueryProvider';
import ThemeScript from './ThemeScript';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeScript />
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryProvider>{children}</QueryProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;

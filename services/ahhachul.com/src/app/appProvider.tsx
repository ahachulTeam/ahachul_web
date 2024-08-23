import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'stores';
import { theme, global } from 'shared/style';
import ThemeScript from 'widgets/theme/themeScript';
import MSWInitializer from './libs/mswInitialize';
import QueryProvider from './libs/react-query';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeScript />
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <MSWInitializer />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <QueryProvider>{children}</QueryProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

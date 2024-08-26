import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, Global } from '@emotion/react';

import { MSWInitializer, QueryProvider } from 'app/lib';
import { ThemeScript } from 'widgets';
import { theme, global } from 'shared/style';
import { store, persistor } from 'shared/stores';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const AppProvider = ({ children }: PropsWithChildren) => {
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
};

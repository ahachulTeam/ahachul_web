import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'stores';
import { theme, global } from 'styles';
import QueryProvider from './QueryProvider';
import ThemeScript from './ThemeScript';
import MSWProvider from './MSWProvider';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeScript />
      <Global styles={global} />
      <ThemeProvider theme={theme}>
        <MSWProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <QueryProvider>{children}</QueryProvider>
            </PersistGate>
          </Provider>
        </MSWProvider>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;

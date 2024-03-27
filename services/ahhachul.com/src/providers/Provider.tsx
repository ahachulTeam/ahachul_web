import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'stores';
import { theme, global } from 'styles';
import QueryProvider from './QueryProvider';
import ThemeScript from './ThemeScript';
import MSWInitializer from './MSWInitializer';

function AppProvider({ children }: PropsWithChildren) {
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

export default AppProvider;

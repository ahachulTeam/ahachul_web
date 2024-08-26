import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, Global } from '@emotion/react';

import themes from 'shared/themes.css';
import globals from 'shared/globals.css';
import { QueryProvider } from 'app/lib';
import { ThemeScript } from 'widgets';
import { store, persistor } from 'shared/stores';

import 'shared/fonts.css';
import '@ahhachul/themes/themes.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const MSWInitializer = React.lazy(() => import('app/lib/msw'));

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeScript />
      <Global styles={globals} />
      <ThemeProvider theme={themes}>
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

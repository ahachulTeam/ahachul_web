import React, { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';

import themes from 'shared/themes.css';
import globals from 'shared/globals.css';
import { MSWInitializer, QueryProvider } from 'app/lib';
import { ThemeScript } from 'widgets';

import 'shared/fonts.css';
import '@ahhachul/themes/themes.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeScript />
      <Global styles={globals} />
      <ThemeProvider theme={themes}>
        <MSWInitializer />
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </>
  );
};

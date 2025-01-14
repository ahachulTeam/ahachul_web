import { PropsWithChildren } from 'react';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { ThemeProvider, Global } from '@emotion/react';
import { MSWInitializer, QueryProvider } from 'app/lib';
import 'shared/fonts.css';
import globals from 'shared/globals.css';
import themes from 'shared/themes.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { ThemeScript } from 'widgets';

import '@ahhachul/themes/themes.css';

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

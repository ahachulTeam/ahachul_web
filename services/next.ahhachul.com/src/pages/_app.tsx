import '@/src/styles/font.css';
import '@ahhachul/themes/themes.css';

import type { AppProps } from 'next/app';
import SEO from '@/src/components/seo/SEO';
import AppProvider from '@/src//providers';
import { useRouteHistory } from '@/src/hooks';

export default function App({ Component, pageProps }: AppProps) {
  useRouteHistory();

  return (
    <>
      <SEO pageProps={pageProps} />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

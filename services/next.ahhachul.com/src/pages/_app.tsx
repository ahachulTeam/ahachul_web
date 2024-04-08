import '@/src/styles/font.css';
import '@ahhachul/themes/themes.css';

import type { AppProps } from 'next/app';
import SEO from '@/src/components/seo/SEO';
import AppProvider from '@/src//providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO pageProps={pageProps} />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

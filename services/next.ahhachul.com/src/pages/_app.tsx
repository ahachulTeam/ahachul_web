import '@/src/styles/font.css';
import '@ahhachul/themes/themes.css';

import type { AppProps } from 'next/app';
import SEO from '@/src/components/seo/SEO';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO pageProps={pageProps} />
      <Component {...pageProps} />
    </>
  );
}

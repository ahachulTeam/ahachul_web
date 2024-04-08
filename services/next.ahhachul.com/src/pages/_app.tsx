import type { AppProps } from 'next/app';
import SEO from '../components/seo/SEO';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO pageProps={pageProps} />
      <Component {...pageProps} />;
    </>
  );
}

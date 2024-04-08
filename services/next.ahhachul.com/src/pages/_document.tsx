import { Html, Head, Main, NextScript } from 'next/document';
import { defaultMetadata } from '@/src/data/seo';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" href="/fonts/Pretendard-Regular.subset.woff2" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Pretendard-Medium.subset.woff2" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Pretendard-SemiBold.subset.woff2" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Pretendard-Bold.subset.woff2" as="font" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <meta name="theme-color" content="#141517" />
        <meta name="msapplication-TileColor" content="#141517" />
        <meta name="msapplication-TileImage" content={defaultMetadata.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

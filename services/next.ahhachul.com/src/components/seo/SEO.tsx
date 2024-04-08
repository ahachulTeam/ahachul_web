import Head from 'next/head';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

import { IMetaData } from '@/src/types/seo';
import { getDomainName } from '@/src/utils/appEnv';
import { defaultMetadata } from '@/src/data/seo';

const SEO = ({ pageProps, metaData = defaultMetadata }: { pageProps: AppProps['pageProps']; metaData?: IMetaData }) => {
  const pathname = usePathname();

  const title = pageProps?.title || metaData.site_name;
  const description = pageProps?.description || metaData.description;
  const image = pageProps?.image || metaData.image;
  const keywords = pageProps?.keywords || metaData.keywords;
  const ogType = pageProps?.ogType || metaData.type;

  const hasRichResults = pageProps?.richResults?.length > 0 ? pageProps.richResults : null;
  const ldJsonScript = () =>
    pageProps?.richResults?.map(({ id, value }: any) => (
      <script
        id={id}
        key={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(value),
        }}
      />
    ));

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=0"
      />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta itemProp="image" content={image} />
      <link rel="canonical" href={`${getDomainName()}${pathname}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={metaData.site_name} />
      <meta property="og:url" content={`${getDomainName()}${pathname}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={metaData.locale} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={metaData.site_name} />
      <meta name="twitter:url" content={`${getDomainName()}${pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />

      {hasRichResults && ldJsonScript()}
    </Head>
  );
};

export default SEO;

import Head from 'next/head';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';

import { IMetaData } from '@/src/types/seo';
import { getDomainName } from '@/src/utils/appEnv';
import { defaultMetadata } from '@/src/data/seo';
import { exportTitleFromPath, exportDescriptionFromPath } from '@/src/utils/export';
import LdJsonList from './LdJson';

const SEO = ({ pageProps, metaData = defaultMetadata }: { pageProps: AppProps['pageProps']; metaData?: IMetaData }) => {
  const image = pageProps?.image || metaData.image;
  const keywords = pageProps?.keywords || metaData.keywords;
  const type = pageProps?.type || metaData.type;
  const hasRichResults = pageProps?.richResults?.length > 0;

  const pathname = usePathname();
  const title = exportTitleFromPath(pageProps?.title, pathname);
  const description = exportDescriptionFromPath(pageProps?.description, pathname);

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=0"
      />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={`${getDomainName()}${pathname}`} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={metaData.site_name} />
      <meta property="og:url" content={`${getDomainName()}${pathname}`} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={metaData.locale} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={metaData.site_name} />
      <meta name="twitter:url" content={`${getDomainName()}${pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />

      {hasRichResults && <LdJsonList richResults={pageProps.richResults} />}
    </Head>
  );
};

export default SEO;

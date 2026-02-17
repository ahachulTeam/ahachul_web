import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { colors } from '@ahhachul/design-system';
import '@ahhachul/design-system/tokens.css';
import { BRAND } from '@ahhachul/domain';
import { createPageMetadata } from '@ahhachul/seo';

import { Pretendard } from '@/asset/font/pretendard';
import { SEO_KEYWORDS, SITE_URL } from '@/constant';
import Providers from '@/context/providers';
import { HTML_LANG_BY_LOCALE } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { cn } from '@/util/cn';

import Header from './_components/Header';
import NavMenu from './_components/NavMenu';
import SeoInternalLinks from './_components/SeoInternalLinks';
import SeoStructuredData from './_components/SeoStructuredData';
import './globals.css';

export const viewport: Viewport = {
  themeColor: colors.white,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = createPageMetadata({
  title: BRAND.defaultTitle,
  description: BRAND.defaultDescription,
  keywords: [...SEO_KEYWORDS],
  siteUrl: SITE_URL,
  pathname: '/',
  rssPath: '/rss.xml',
}) as Metadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={HTML_LANG_BY_LOCALE[locale]}>
      <body className={cn('font-sans antialiased', Pretendard.variable)}>
        <SeoStructuredData />
        <NextTopLoader height={2} color={colors['key-color']} showSpinner={false} />
        <Providers>
          <Header />
          {children}
          <SeoInternalLinks />
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}

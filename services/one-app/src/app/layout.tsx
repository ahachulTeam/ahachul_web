import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { colors } from '@ahhachul/design-system';
import '@ahhachul/design-system/tokens.css';
import { BRAND } from '@ahhachul/domain';
import { createPageMetadata } from '@ahhachul/seo';

import { Pretendard } from '@/asset/font/pretendard';
import { SITE_URL } from '@/constant';
import Providers from '@/context/providers';
import { cn } from '@/util/cn';

import Header from './_components/Header';
import NavMenu from './_components/NavMenu';
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
  keywords: [
    '지하철',
    '지하철 민원',
    '지하철 분실물',
    '지하철 유실물',
    '1호선',
    '2호선',
    '3호선',
    '4호선',
    '5호선',
    '6호선',
    '7호선',
    '8호선',
    '9호선',
    '신분당선',
    '수인분당선',
    '경의중앙선',
  ],
  siteUrl: SITE_URL,
  pathname: '/',
}) as Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('font-sans antialiased', Pretendard.variable)}>
        <NextTopLoader height={2} color={colors['key-color']} showSpinner={false} />
        <Providers>
          <Header />
          {children}
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}

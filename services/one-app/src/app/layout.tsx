import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { Pretendard } from '@/asset/font/pretendard';
import Providers from '@/context/providers';
import { cn } from '@/util/cn';

import Header from './_components/Header';
import NavMenu from './_components/NavMenu';
import './globals.css';

export const viewport: Viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '아하철 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱',
  description:
    '지하철 이용의 모든 것, 아하철과 함께하세요. 불편사항은 민원 서비스로 해결하고, 소중한 분실물은 빠르게 찾을 수 있습니다. 지하철 이용객들과 일상을 나누고 유용한 정보를 공유하는 따뜻한 커뮤니티까지, 더 나은 지하철 문화를 만들어갑니다.',
  applicationName: '아하철 | AhHachul',
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
  ].join(', '),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('font-sans antialiased', Pretendard.variable)}>
        <NextTopLoader height={2} color="#2ACF6C" showSpinner={false} />
        <Providers>
          <Header />
          {children}
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}

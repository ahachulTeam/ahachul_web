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
  title: '아하철 / 1등 지하철 민원 & 유실물 & 커뮤니티 정보 앱',
  description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
  applicationName: '아하철 | AhHachul',
  keywords: [
    '지하철',
    '지하철 민원',
    '지하철 유실물',
    '지하철 분실물',
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

import type { Metadata } from 'next';

import { Pretendard } from '@/asset/font/pretendard';
import Providers from '@/context/providers';
import { cn } from '@/util/cn';

import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('font-sans antialiased', Pretendard.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

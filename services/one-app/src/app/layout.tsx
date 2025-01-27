import { Pretendard } from '@/asset/font/pretendard';
import Providers from '@/context/providers';
import { cn } from '@/util/cn';

import Header from './_components/Header';
import NavMenu from './_components/NavMenu';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('font-sans antialiased', Pretendard.variable)}>
        <Providers>
          <Header />
          {children}
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}

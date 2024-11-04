import type { Metadata } from 'next';
import '../globals.css';
import { RQProvider } from '../_components/RQProvider';
import { MSWComponent } from '../_components/MSWComponent';
import { cn } from '@/common/utils/cn';
import { Pretendard } from '@/common/assets/fonts/pretendard';

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
        <MSWComponent />
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  );
}
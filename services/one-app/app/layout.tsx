import type { Metadata } from 'next';
import './globals.css';
import { cn } from './_lib/cn';
import { Pretendard } from '../assets/fonts/pretendard/font';

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
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import WelcomeMessage from '@/app/_components/WelcomeMessage';

export const metadata: Metadata = {
  title: '홈 / 아하철 - 1등 지하철 유실물 & 민원 정보앱',
  description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
  applicationName: '아하철 | AhHachul',
  keywords:
    '지하철, 지하철 민원, 지하철 유실물, 지하철 분실물, 1호선, 2호선, 3호선, 4호선, 5호선, 6호선, 7호선, 8호선, 9호선, 신분당선, 수인분당선, 경의중앙선',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
    </main>
  );
}

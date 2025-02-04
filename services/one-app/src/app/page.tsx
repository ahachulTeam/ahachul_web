import type { Metadata } from 'next';

import WelcomeMessage from '@/app/_components/WelcomeMessage';

export const metadata: Metadata = {
  title: '홈 / 1등 지하철 민원 & 유실물 & 커뮤니티 정보 앱',
  description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
  applicationName: '아하철 | AhHachul',
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
    </main>
  );
}

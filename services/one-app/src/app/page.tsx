import type { Metadata } from 'next';

import WelcomeMessage from '@/app/_components/WelcomeMessage';

export const metadata: Metadata = {
  title: '홈 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 / 아하철',
  description:
    '지하철 이용의 모든 것, 아하철과 함께하세요. 불편사항은 민원 서비스로 해결하고, 소중한 분실물은 빠르게 찾을 수 있습니다. 지하철 이용객들과 일상을 나누고 유용한 정보를 공유하는 따뜻한 커뮤니티까지, 더 나은 지하철 문화를 만들어갑니다.',
  applicationName: '아하철 | AhHachul',
  openGraph: {
    title: '홈 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 / 아하철',
    description:
      '지하철 이용의 모든 것, 아하철과 함께하세요. 불편사항은 민원 서비스로 해결하고, 소중한 분실물은 빠르게 찾을 수 있습니다. 지하철 이용객들과 일상을 나누고 유용한 정보를 공유하는 따뜻한 커뮤니티까지, 더 나은 지하철 문화를 만들어갑니다.',
    images: [
      {
        url: 'https://static.dev.ahhachul.com/banners/main.png',
        width: 800,
        height: 400,
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
    </main>
  );
}

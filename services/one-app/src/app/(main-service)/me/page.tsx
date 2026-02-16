import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

import MyDashboard from './_components/MyDashboard';

export const metadata: Metadata = createPageMetadata({
  title: '마이 페이지 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
  description: '내 정보, 즐겨찾기 역, 메시지/알림으로 빠르게 이동할 수 있는 개인 대시보드입니다.',
  siteUrl: SITE_URL,
  pathname: '/me',
}) as Metadata;

export default function MyPage() {
  return (
    <main className="min-h-screen bg-gray-10 pb-16">
      <MyDashboard />
    </main>
  );
}

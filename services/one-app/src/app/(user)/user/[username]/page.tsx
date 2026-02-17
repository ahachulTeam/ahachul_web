import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

import ProfileOverview from './_components/ProfileOverview';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  return createPageMetadata({
    title: `${username} 프로필 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철`,
    description: `${username}님의 프로필 정보를 확인합니다.`,
    siteUrl: SITE_URL,
    pathname: `/user/${encodeURIComponent(username)}`,
  }) as Metadata;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-gray-10">
      <ProfileOverview username={username} />
    </main>
  );
}

import type { Metadata } from 'next';
import { BRAND } from '@ahhachul/domain';
import { createPageMetadata } from '@ahhachul/seo';

import WelcomeMessage from '@/app/_components/WelcomeMessage';
import { SITE_URL } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: '홈 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
  description: BRAND.defaultDescription,
  siteUrl: SITE_URL,
  pathname: '/',
}) as Metadata;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
    </main>
  );
}

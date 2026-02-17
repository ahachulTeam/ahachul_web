import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

import MyDashboard from './_components/MyDashboard';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.me.title),
  description: SEO_PAGE_COPY.me.description,
  siteUrl: SITE_URL,
  pathname: '/me',
  noIndex: true,
}) as Metadata;

export default function MyPage() {
  return (
    <main className="min-h-screen bg-gray-10 pb-16">
      <MyDashboard />
    </main>
  );
}

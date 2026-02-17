import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import WelcomeMessage from '@/app/_components/WelcomeMessage';
import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.home.title),
  description: SEO_PAGE_COPY.home.description,
  keywords: [...SEO_KEYWORDS],
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

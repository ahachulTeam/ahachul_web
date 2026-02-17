import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import WelcomeMessage from '@/app/_components/WelcomeMessage';
import { SEO_KEYWORDS, SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';
import { getSeoNavigationLinks } from '@/seo/content-discovery';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.home.title),
  description: SEO_PAGE_COPY.home.description,
  keywords: [...SEO_KEYWORDS],
  siteUrl: SITE_URL,
  pathname: '/',
  rssPath: '/rss.xml',
}) as Metadata;

export default function Home() {
  const navigationLinks = getSeoNavigationLinks().filter(link => link.path !== '/me');

  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
      <section className="px-5 pt-6">
        <h1 className="text-title-large text-gray-100">{SEO_PAGE_COPY.home.title}</h1>
        <p className="mt-2 text-body-medium text-gray-80">{SEO_PAGE_COPY.home.description}</p>
      </section>

      <section className="px-5 pb-6 pt-5">
        <h2 className="text-title-small text-gray-100">주요 서비스 바로가기</h2>
        <ul className="mt-3 grid gap-2">
          {navigationLinks.map(link => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="block rounded-2xl border border-gray-30 bg-white px-4 py-3"
              >
                <p className="text-label-large text-gray-100">{link.name}</p>
                <p className="mt-1 text-body-small text-gray-70">{link.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { createPageMetadata } from '@ahhachul/seo';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/components/SearchForm';
import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import CommunityPosts from '../community/_components/CommunityPosts';
import { prefetchPosts } from '../community/_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    hashTag?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return createPageMetadata({
    title: withBrandTitle('해시태그 검색'),
    description: '해시태그 기반으로 지하철 커뮤니티 게시글을 탐색합니다.',
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/hashtag', locale),
  }) as Metadata;
}

export default async function HashtagPage({ searchParams }: Props) {
  const query = await searchParams;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const headersList = await headers();
  const isServerRender = !headersList.get('next-url');

  let dehydratedState;

  if (isServerRender) {
    const queryClient = new QueryClient();
    await prefetchPosts(queryClient, { hashTag: query.hashTag });
    dehydratedState = dehydrate(queryClient);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: '#해시태그', href: localizePathname('/hashtag', locale) },
          ]}
        />
        <SearchForm name="hashTag" />
        <section className="px-5 py-2">
          <p className="text-body-small text-gray-70">
            해시태그로 커뮤니티 글을 검색합니다. 예: <span className="font-semibold">#2호선</span>
          </p>
        </section>
        <CommunityPosts />
      </HydrationBoundary>
    </main>
  );
}

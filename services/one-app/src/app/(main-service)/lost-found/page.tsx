import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import Link from 'next/link';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/components/SearchForm';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import type { LostFoundType, SubwayLineFilterOptions } from '@/types';

import Filters from './_components/FilterList';
import LostFoundPosts from './_components/LostFoundPosts';
import { generateLostFoundMetadata } from './_lib/metadata';
import { prefetchPosts } from './_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: LostFoundType;
    subwayLineId?: SubwayLineFilterOptions;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return generateLostFoundMetadata(searchParams);
}

export default async function LostFoundPage({ searchParams }: Props) {
  const query = await searchParams;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const headersList = await headers();
  const isServerRender = !headersList.get('next-url');

  let dehydratedState;

  if (isServerRender) {
    const queryClient = new QueryClient();
    await prefetchPosts(queryClient, query);
    dehydratedState = dehydrate(queryClient);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white ">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.lostFound, href: localizePathname('/lost-found', locale) },
          ]}
        />
        <SearchForm />
        <Filters />
        <div className="px-5 pb-2 pt-3">
          <Link
            href={localizePathname('/lost-found/new', locale)}
            className="inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            {messages.seo.lostFoundNew.title}
          </Link>
        </div>
        <LostFoundPosts />
      </HydrationBoundary>
    </main>
  );
}

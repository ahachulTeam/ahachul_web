import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import Link from 'next/link';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/components/SearchForm';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { CommunityType } from '@/types/community';

import CommunityPosts from './_components/CommunityPosts';
import CommunityReliabilitySignal from './_components/CommunityReliabilitySignal';
import Filters from './_components/FilterList';
import { generateCommunityMetadata } from './_lib/metadata';
import { prefetchPosts } from './_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: CommunityType;
    subwayLineId?: string;
    stationId?: string;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return generateCommunityMetadata(searchParams);
}

export default async function CommunityPage({ searchParams }: Props) {
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
    <main className="min-h-screen px-4 pb-28 pt-3">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          visuallyHidden
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.community, href: localizePathname('/community', locale) },
          ]}
        />
        <SearchForm />
        <div className="mt-3 flex flex-col gap-3">
          <Filters />
          <CommunityReliabilitySignal />
          <div className="overflow-hidden rounded-3xl border border-gray-30 bg-white shadow-[0_10px_24px_rgba(14,20,28,0.08)]">
            <CommunityPosts />
          </div>
        </div>
        <Link
          href={localizePathname('/community/new', locale)}
          className="ah-floating-action fixed bottom-[92px] right-4 z-40 inline-flex items-center rounded-2xl bg-gray-100 px-5 py-3 text-label-large text-white"
        >
          + 글쓰기
        </Link>
      </HydrationBoundary>
    </main>
  );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import Link from 'next/link';

import SearchForm from '@/components/SearchForm';
import { localizePathname } from '@/i18n';
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
        <SearchForm />
        <Filters />
        <CommunityReliabilitySignal />
        <CommunityPosts />
        <Link
          href={localizePathname('/community/new', locale)}
          className="fixed bottom-[84px] right-4 z-40 inline-flex items-center rounded-full bg-gray-100 px-5 py-3 text-label-large text-white shadow-[0_8px_24px_rgba(30,31,46,0.3)]"
        >
          + 글쓰기
        </Link>
      </HydrationBoundary>
    </main>
  );
}

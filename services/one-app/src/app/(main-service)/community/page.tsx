import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

import SearchForm from '@/component/SearchForm';
import { SubwayLineFilterOptions } from '@/types';
import { CommunityType } from '@/types/community';

import CommunityPosts from './_components/CommunityPosts';
import Filters from './_components/FilterList';
import { generateCommunityMetadata } from './_lib/metadata';
import { prefetchPosts } from './_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: CommunityType;
    subwayLineId?: SubwayLineFilterOptions;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return generateCommunityMetadata(searchParams);
}

export default async function CommunityPage({ searchParams }: Props) {
  const query = await searchParams;
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
        <CommunityPosts />
      </HydrationBoundary>
    </main>
  );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

<<<<<<< HEAD
import SearchForm from '@/component/SearchForm';
=======
import SearchFormWithAction from '@/component/SearchFormWithAction';
>>>>>>> develop
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
<<<<<<< HEAD
        <SearchForm />
=======
        <SearchFormWithAction />
>>>>>>> develop
        <Filters />
        <LostFoundPosts />
      </HydrationBoundary>
    </main>
  );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

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
    <main className="flex min-h-screen flex-col bg-white ">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.community, href: localizePathname('/community', locale) },
          ]}
        />
        <SearchForm />
        <Filters />
        <CommunityReliabilitySignal />
        <CommunityPosts />
      </HydrationBoundary>
    </main>
  );
}

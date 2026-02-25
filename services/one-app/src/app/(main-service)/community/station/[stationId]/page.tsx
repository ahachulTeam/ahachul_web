import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/components/SearchForm';
import { getLocaleMessages, localizePathname, type SupportedLocale } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { CommunityType } from '@/types/community';

import CommunityPosts from '../../_components/CommunityPosts';
import CommunityReliabilitySignal from '../../_components/CommunityReliabilitySignal';
import Filters from '../../_components/FilterList';
import { generateCommunityMetadata } from '../../_lib/metadata';
import { prefetchPosts } from '../../_lib/prefetchPosts';

type SearchQuery = {
  q?: string;
  category?: CommunityType;
  subwayLineId?: string;
  stationId?: string;
  stationName?: string;
  lineName?: string;
};

type Props = {
  params: Promise<{
    stationId: string;
  }>;
  searchParams: Promise<SearchQuery>;
};

function buildStationScopedHref(stationId: string, query: SearchQuery, locale: SupportedLocale) {
  const scopedSearch = new URLSearchParams();
  scopedSearch.set('stationId', stationId);

  if (query.q) {
    scopedSearch.set('q', query.q);
  }
  if (query.category) {
    scopedSearch.set('category', query.category);
  }
  if (query.subwayLineId) {
    scopedSearch.set('subwayLineId', query.subwayLineId);
  }
  if (query.stationName) {
    scopedSearch.set('stationName', query.stationName);
  }
  if (query.lineName) {
    scopedSearch.set('lineName', query.lineName);
  }

  return `${localizePathname(`/community/station/${stationId}`, locale)}?${scopedSearch.toString()}`;
}

export async function generateMetadata({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const query = await searchParams;

  return generateCommunityMetadata(
    Promise.resolve({
      ...query,
      stationId: resolvedParams.stationId,
    }),
  );
}

export default async function CommunityStationPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const query = await searchParams;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const scopedHref = buildStationScopedHref(resolvedParams.stationId, query, locale);

  if (query.stationId !== resolvedParams.stationId) {
    redirect(scopedHref);
  }

  const scopedQuery = {
    ...query,
    stationId: resolvedParams.stationId,
  };
  const stationLabel = query.stationName ? `${query.stationName}역` : '역';
  const headersList = await headers();
  const isServerRender = !headersList.get('next-url');

  let dehydratedState;

  if (isServerRender) {
    const queryClient = new QueryClient();
    await prefetchPosts(queryClient, scopedQuery);
    dehydratedState = dehydrate(queryClient);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white ">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.community, href: localizePathname('/community', locale) },
            { name: `${stationLabel} 커뮤니티`, href: scopedHref },
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

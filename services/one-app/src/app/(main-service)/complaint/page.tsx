import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/component/SearchForm';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import type { SubwayLineFilterOptions } from '@/types';

import ComplaintPosts from './_components/ComplaintPosts';
import Filters from './_components/FilterList';
import { generateComplaintMetadata } from './_lib/metadata';
import { prefetchPosts } from './_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    keyword?: string;
    subwayLineId?: SubwayLineFilterOptions;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return generateComplaintMetadata(searchParams);
}

export default async function ComplaintPage({ searchParams }: Props) {
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
    <main className="flex min-h-screen flex-col bg-white">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.complaint, href: localizePathname('/complaint', locale) },
          ]}
        />
        <SearchForm />
        <Filters />
        <ComplaintPosts />
      </HydrationBoundary>
    </main>
  );
}

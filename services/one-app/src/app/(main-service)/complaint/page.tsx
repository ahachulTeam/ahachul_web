import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import Link from 'next/link';

import BreadcrumbNav from '@/app/_components/BreadcrumbNav';
import SearchForm from '@/components/SearchForm';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import type {
  ComplaintStationFilterValue,
  ComplaintSubwayLineFilterValue,
} from '@/types/complaint';

import ComplaintPosts from './_components/ComplaintPosts';
import Filters from './_components/FilterList';
import { generateComplaintMetadata } from './_lib/metadata';
import { prefetchPosts } from './_lib/prefetchPosts';

type Props = {
  searchParams: Promise<{
    keyword?: string;
    subwayLineId?: ComplaintSubwayLineFilterValue;
    stationId?: ComplaintStationFilterValue;
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
    <main className="min-h-screen px-4 pb-28 pt-3">
      <HydrationBoundary state={dehydratedState}>
        <BreadcrumbNav
          visuallyHidden
          items={[
            { name: messages.nav.home, href: localizePathname('/', locale) },
            { name: messages.nav.complaint, href: localizePathname('/complaint', locale) },
          ]}
        />
        <SearchForm />
        <div className="mt-3 flex flex-col gap-3">
          <Filters />
          <div className="overflow-hidden rounded-3xl border border-gray-30 bg-white shadow-[0_10px_24px_rgba(14,20,28,0.08)]">
            <ComplaintPosts />
          </div>
        </div>
        <Link
          href={localizePathname('/complaint/panel', locale)}
          className="ah-floating-action fixed bottom-[92px] right-4 z-40 inline-flex items-center rounded-2xl bg-gray-100 px-5 py-3 text-label-large text-white"
        >
          + 민원 접수
        </Link>
      </HydrationBoundary>
    </main>
  );
}

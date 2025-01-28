import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import SearchForm from '@/component/SearchForm';
import { SUBWAY_LINES } from '@/constant';
import type {
  ApiResponse,
  LostFoundPost,
  LostFoundType,
  PaginatedList,
  SubwayLineFilterOptions,
} from '@/types';

import Filters from './_components/FilterList';
import LostFoundPosts from './_components/LostFoundPosts';
import { getLostFoundPosts } from './_lib/getLostFoundPosts';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ subwayLineId?: string }>;
}): Promise<Metadata> {
  const { subwayLineId } = await searchParams;

  let title = '유실물 / 아하철 - 1등 지하철 유실물 & 민원 정보앱';

  if (subwayLineId && +subwayLineId !== 0) {
    title = SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name + ' ' + title;
  }

  return {
    title,
    description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
    applicationName: '아하철 | AhHachul',
    keywords:
      '지하철, 지하철 민원, 지하철 유실물, 지하철 분실물, 1호선, 2호선, 3호선, 4호선, 5호선, 6호선, 7호선, 8호선, 9호선, 신분당선, 수인분당선, 경의중앙선',
    viewport: { width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false },
  };
}

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: LostFoundType;
    subwayLineId?: SubwayLineFilterOptions;
  }>;
};

export default async function LostFoundPage({ searchParams }: Props) {
  const query = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery<
    ApiResponse<PaginatedList<LostFoundPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<LostFoundPost>>>,
    [_1: string, _2: string, _3: typeof query],
    string
  >({
    queryKey: ['lost-found', 'posts', query],
    queryFn: getLostFoundPosts,
    initialPageParam: '',
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col bg-white ">
      <HydrationBoundary state={dehydratedState}>
        <SearchForm
          actionString="/lost-found"
          q={query.q}
          category={query.category}
          subwayLineId={query.subwayLineId}
        />
        <Filters category={query.category} subwayLineId={query.subwayLineId} />
        <LostFoundPosts query={query} />
      </HydrationBoundary>
    </main>
  );
}

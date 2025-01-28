import type { QueryClient, InfiniteData } from '@tanstack/react-query';

import { objectToQueryString } from '@ahhachul/utils';

import type {
  ApiResponse,
  LostFoundPost,
  LostFoundType,
  PaginatedList,
  SubwayLineFilterOptions,
} from '@/types';

import { getLostFoundPosts } from './getLostFoundPosts';

type SearchParams = {
  q?: string;
  category?: LostFoundType;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: SearchParams) {
  await queryClient.prefetchInfiniteQuery<
    ApiResponse<PaginatedList<LostFoundPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<LostFoundPost>>>,
    [_1: string, _2: string, _3: string],
    string
  >({
    queryKey: ['lost-found', 'posts', objectToQueryString(query)],
    queryFn: getLostFoundPosts,
    initialPageParam: '',
  });
}

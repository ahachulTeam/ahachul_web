import type { QueryClient, InfiniteData } from '@tanstack/react-query';

import { buildQuerySignature, lostFoundQueryKeys } from '@ahhachul/domain';

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
  keyword?: string;
  category?: LostFoundType;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: SearchParams) {
  const querySignature = buildQuerySignature({
    keyword: query.keyword ?? query.q,
    category: query.category,
    subwayLineId: query.subwayLineId,
  });

  await queryClient.prefetchInfiniteQuery<
    ApiResponse<PaginatedList<LostFoundPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<LostFoundPost>>>,
    ReturnType<typeof lostFoundQueryKeys.list>,
    string
  >({
    queryKey: lostFoundQueryKeys.list(querySignature),
    queryFn: getLostFoundPosts,
    initialPageParam: '',
  });
}

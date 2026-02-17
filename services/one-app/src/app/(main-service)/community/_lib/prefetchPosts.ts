import type { QueryClient, InfiniteData } from '@tanstack/react-query';

import { buildQuerySignature, communityQueryKeys } from '@ahhachul/domain';

import type { ApiResponse, PaginatedList, SubwayLineFilterOptions } from '@/types';
import { CommunityPost, CommunityType } from '@/types/community';

import { getCommunityPosts } from './getCommunityPosts';

type SearchParams = {
  q?: string;
  keyword?: string;
  category?: CommunityType;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: SearchParams) {
  const querySignature = buildQuerySignature({
    keyword: query.keyword ?? query.q,
    category: query.category,
    subwayLineId: query.subwayLineId,
  });

  await queryClient.prefetchInfiniteQuery<
    ApiResponse<PaginatedList<CommunityPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<CommunityPost>>>,
    ReturnType<typeof communityQueryKeys.list>,
    string
  >({
    queryKey: communityQueryKeys.list(querySignature),
    queryFn: getCommunityPosts,
    initialPageParam: '',
  });
}

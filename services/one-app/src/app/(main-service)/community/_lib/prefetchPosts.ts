import type { QueryClient, InfiniteData } from '@tanstack/react-query';

import { buildQuerySignature, communityQueryKeys } from '@ahhachul/domain';

import type { ApiResponse, PaginatedList } from '@/types';
import { CommunityPost, CommunityType } from '@/types/community';

import { getCommunityPosts } from './getCommunityPosts';

type SearchParams = {
  q?: string;
  keyword?: string;
  hashTag?: string;
  writer?: string;
  category?: CommunityType;
  subwayLineId?: string;
  stationId?: string;
};

export async function prefetchPosts(queryClient: QueryClient, query: SearchParams) {
  const querySignature = buildQuerySignature({
    keyword: query.keyword ?? query.q,
    hashTag: query.hashTag,
    writer: query.writer,
    category: query.category,
    subwayLineId: query.subwayLineId,
    stationId: query.stationId,
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

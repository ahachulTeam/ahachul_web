import type { QueryClient, InfiniteData } from '@tanstack/react-query';

import { objectToQueryString } from '@ahhachul/utils';

import type { ApiResponse, PaginatedList, SubwayLineFilterOptions } from '@/types';
import { CommunityPost, CommunityType } from '@/types/community';

import { getCommunityPosts } from './getCommunityPosts';

type SearchParams = {
  q?: string;
  category?: CommunityType;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: SearchParams) {
  await queryClient.prefetchInfiniteQuery<
    ApiResponse<PaginatedList<CommunityPost>>,
    Error,
    InfiniteData<ApiResponse<PaginatedList<CommunityPost>>>,
    [_1: string, _2: string, _3: string],
    string
  >({
    queryKey: ['community', 'posts', objectToQueryString(query)],
    queryFn: getCommunityPosts,
    initialPageParam: '',
  });
}

import { QueryClient } from '@tanstack/react-query';

import { SubwayLineFilterOptions } from '@/types';

import { getComplaintPosts } from './getComplaintPosts';

type Props = {
  keyword?: string;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: Props) {
  const queryString = new URLSearchParams({
    ...(query.keyword ? { keyword: query.keyword } : {}),
    ...(query.subwayLineId ? { subwayLineId: query.subwayLineId } : {}),
  }).toString();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['complaint', 'posts', queryString],
    queryFn: ({ pageParam }) =>
      getComplaintPosts({ queryKey: ['complaint', 'posts', queryString], pageParam }),
    initialPageParam: '',
  });
}

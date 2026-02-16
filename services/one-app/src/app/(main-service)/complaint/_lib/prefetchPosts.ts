import { QueryClient } from '@tanstack/react-query';

import { buildQuerySignature, complaintQueryKeys } from '@ahhachul/domain';

import { SubwayLineFilterOptions } from '@/types';

import { getComplaintPosts } from './getComplaintPosts';

type Props = {
  keyword?: string;
  subwayLineId?: SubwayLineFilterOptions;
};

export async function prefetchPosts(queryClient: QueryClient, query: Props) {
  const querySignature = buildQuerySignature({
    keyword: query.keyword,
    subwayLineId: query.subwayLineId,
  });
  const queryKey = complaintQueryKeys.list(querySignature);

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getComplaintPosts({ queryKey, pageParam }),
    initialPageParam: '',
  });
}

import { QueryClient } from '@tanstack/react-query';

import { buildQuerySignature, complaintQueryKeys } from '@ahhachul/domain';

import type {
  ComplaintStationFilterValue,
  ComplaintSubwayLineFilterValue,
} from '@/types/complaint';

import { getComplaintPosts } from './getComplaintPosts';

type Props = {
  keyword?: string;
  subwayLineId?: ComplaintSubwayLineFilterValue;
  stationId?: ComplaintStationFilterValue;
};

export async function prefetchPosts(queryClient: QueryClient, query: Props) {
  const querySignature = buildQuerySignature({
    keyword: query.keyword,
    subwayLineId: query.subwayLineId,
    stationId: query.stationId,
  });
  const queryKey = complaintQueryKeys.list(querySignature);

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getComplaintPosts({ queryKey, pageParam }),
    initialPageParam: '',
  });
}

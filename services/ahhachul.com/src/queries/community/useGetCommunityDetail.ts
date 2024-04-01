import { UseSuspenseQueryResult, useSuspenseQuery } from 'queries/query';
import { getCommunityDetail } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type ICommunityDetail as GetCommunityDetailResponse } from 'types';
import { COMMUNITY_DETAIL_KEY } from './keys';

export const useGetCommunityDetail = (postId: string): UseSuspenseQueryResult<GetCommunityDetailResponse> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(COMMUNITY_DETAIL_KEY).detail(postId),
    queryFn: async () => {
      return await getCommunityDetail(postId);
    },
    select: (res) => res.data.result,
  });
};

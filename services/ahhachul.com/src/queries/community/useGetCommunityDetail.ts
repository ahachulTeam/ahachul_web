import { InfiniteData, UseSuspenseQueryResult, useSuspenseQuery } from 'queries/query';
import { getCommunityDetail } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type ICommunityList as GetCommunityListResponse } from 'types';
import { COMMUNITY_DETAIL_KEY } from './keys';

export const useGetCommunityDetail = (
  postId: string,
): UseSuspenseQueryResult<InfiniteData<GetCommunityListResponse, Error>> => {
  return useSuspenseQuery({
    queryKey: getQueryKeys(COMMUNITY_DETAIL_KEY).detail(postId),
    queryFn: async () => {
      return await getCommunityDetail(postId);
    },
  });
};

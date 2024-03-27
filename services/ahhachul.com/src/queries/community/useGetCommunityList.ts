import { InfiniteData, UseSuspenseInfiniteQueryResult, useSuspenseInfiniteQuery } from 'queries/query';
import { getCommunityList, getCommunityListURL } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import {
  type ICommunityParams as GetCommunityListRequestParams,
  type ICommunityList as GetCommunityListResponse,
} from 'types';
import { COMMUNITY_LIST_KEY } from './keys';

type Params = GetCommunityListRequestParams & {
  initPageToken?: number;
};

export const useGetCommunityList = (
  params: Params,
): UseSuspenseInfiniteQueryResult<InfiniteData<GetCommunityListResponse, Error>> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_LIST_KEY).list({ params, getCommunityListURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getCommunityList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};

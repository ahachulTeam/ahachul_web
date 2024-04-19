import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from 'queries/query';
import { AxiosResponse } from 'axios';
import { getCommunityURL } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type ICommunityParams as GetCommunityListRequestParams, ICommunityList } from 'types';
import { COMMUNITY_LIST_KEY } from './keys';
import { IResponse } from 'types';
import { CommunityApi } from 'api';

export const useGetCommunityList = (
  params: GetCommunityListRequestParams,
): UseSuspenseInfiniteQueryResult<InfiniteData<AxiosResponse<IResponse<ICommunityList>>, Error>, unknown> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_LIST_KEY).list({ params, getCommunityURL }),
    queryFn: async ({ pageParam = params?.page }) => {
      return await CommunityApi.getCommunityList({ ...params, page: pageParam });
    },
    initialPageParam: params?.page,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};

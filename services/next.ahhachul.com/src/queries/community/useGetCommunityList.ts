import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from '@/src/queries/query';
import { AxiosResponse } from 'axios';
import { getCommunityURL } from '@/src/api/community';
import { getQueryKeys } from '@/src/queries/query-key';
import { type ICommunityParams as GetCommunityListRequestParams, ICommunityList } from '@/src/types';
import { COMMUNITY_LIST_KEY } from './keys';
import { IResponse } from '@/src/types';
import { CommunityApi } from '@/src/api';

type Params = GetCommunityListRequestParams & {
  initPageToken?: number;
};

export const useGetCommunityList = (
  params: Params,
): UseSuspenseInfiniteQueryResult<InfiniteData<AxiosResponse<IResponse<ICommunityList>>, Error>, unknown> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_LIST_KEY).list({ params, getCommunityURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await CommunityApi.getCommunityList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};

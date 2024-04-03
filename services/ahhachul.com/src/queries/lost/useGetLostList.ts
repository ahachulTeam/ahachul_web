import { InfiniteData, UseSuspenseInfiniteQueryResult, useSuspenseInfiniteQuery } from 'queries/query';
import { getLostList, getLostListURL } from 'api/lost';
import { getQueryKeys } from 'queries/query-key';
import { type ILostParams as GetLostListRequestParams, type ILostList as GetLostListResponse } from 'types/lost';
import { LOST_LIST_KEY } from './keys';
import { IResponse } from 'types';

type Params = GetLostListRequestParams & {
  initPageToken?: number;
};

export const useGetLostList = (
  params: Params,
): UseSuspenseInfiniteQueryResult<InfiniteData<IResponse<GetLostListResponse>, Error>> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(LOST_LIST_KEY).list({ params, getLostListURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getLostList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};

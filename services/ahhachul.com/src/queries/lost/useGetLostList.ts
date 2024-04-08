import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from 'queries/query';
import { getLostList, getLostURL } from 'api/lost';
import { getQueryKeys } from 'queries/query-key';
import { ILostList, type ILostParams as GetLostListRequestParams } from 'types/lost';
import { LOST_LIST_KEY } from './keys';
import { IResponse } from 'types';
import { AxiosResponse } from 'axios';

type Params = GetLostListRequestParams & {
  initPageToken?: number;
};

export const useGetLostList = (
  params: Params,
): UseSuspenseInfiniteQueryResult<InfiniteData<AxiosResponse<IResponse<ILostList>>, Error>, unknown> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(LOST_LIST_KEY).list({ params, getLostURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getLostList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.hasNext && params?.page + 1,
  });
};

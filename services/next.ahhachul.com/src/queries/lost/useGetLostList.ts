import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from '@/src/queries/query';
import { getQueryKeys } from '@/src/queries/query-key';
import { ILostList, type ILostParams as GetLostListRequestParams } from '@/src/types/lost';
import { LOST_LIST_KEY } from './keys';
import { IResponse } from '@/src/types';
import { AxiosResponse } from 'axios';
import { LostApi } from '@/src/api';

export const useGetLostList = (
  params: GetLostListRequestParams,
): UseSuspenseInfiniteQueryResult<InfiniteData<AxiosResponse<IResponse<ILostList>>, Error>, unknown> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(LOST_LIST_KEY).list({ params, url: LostApi.getLostURL }),
    queryFn: async ({ pageParam = params?.page }) => {
      return await LostApi.getLostList({ ...params, page: pageParam });
    },
    initialPageParam: params?.page,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};


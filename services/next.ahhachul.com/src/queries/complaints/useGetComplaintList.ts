import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from '@/src/queries/query';
import { getCommunityURL } from '@/src/api/community';
import { getQueryKeys } from '@/src/queries/query-key';
import { type IComplaintParams as GetComplaintListRequestParams, IComplaintList, IResponse } from '@/src/types';
import { COMPLAINTS_LIST_KEY } from './keys';
import { getComplaintList } from '@/src/api/complaints';
import { AxiosResponse } from 'axios';

export const useGetComplaintList = (
  params: GetComplaintListRequestParams,
): UseSuspenseInfiniteQueryResult<InfiniteData<AxiosResponse<IResponse<IComplaintList>>, Error>, unknown> => {
  return useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMPLAINTS_LIST_KEY).list({ params, getCommunityURL }),
    queryFn: async ({ pageParam = params?.page }) => {
      return await getComplaintList({ ...params, page: pageParam });
    },
    initialPageParam: params?.page,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });
};

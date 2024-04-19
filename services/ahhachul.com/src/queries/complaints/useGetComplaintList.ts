import { InfiniteData, useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryResult } from 'queries/query';
import { getCommunityURL } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type IComplaintParams as GetComplaintListRequestParams, IComplaintList, IResponse } from 'types';
import { COMPLAINTS_LIST_KEY } from './keys';
import { getComplaintList } from 'api/complaints';
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

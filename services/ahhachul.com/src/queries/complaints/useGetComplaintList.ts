import { useSuspenseInfiniteQuery } from 'queries/query';
import { getCommunityURL } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type IComplaintParams as GetComplaintListRequestParams, IComplaint } from 'types';
import { COMPLAINTS_LIST_KEY } from './keys';
import { getComplaintList } from 'api/complaints';

type Params = GetComplaintListRequestParams & {
  initPageToken?: number;
};

export const useGetComplaintList = (params: Params): IComplaint[] => {
  const res = useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMPLAINTS_LIST_KEY).list({ params, getCommunityURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getComplaintList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });

  return res.data.pages.map((page) => page.data.result.posts).flat();
};

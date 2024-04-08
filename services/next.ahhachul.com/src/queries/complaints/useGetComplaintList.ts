import { useSuspenseInfiniteQuery } from '@/src/queries/query';
import { getCommunityURL } from '@/src/api/community';
import { getQueryKeys } from '@/src/queries/query-key';
import { type IComplaintParams as GetComplaintListRequestParams, IComplaint } from '@/src/types';
import { COMPLAINTS_LIST_KEY } from './keys';
import { getComplaintList } from '@/src/api/complaints';

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

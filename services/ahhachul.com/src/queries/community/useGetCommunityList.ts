import { useSuspenseInfiniteQuery } from 'queries/query';
import { getCommunityList, getCommunityURL } from 'api/community';
import { getQueryKeys } from 'queries/query-key';
import { type ICommunityParams as GetCommunityListRequestParams, ICommunity } from 'types';
import { COMMUNITY_LIST_KEY } from './keys';

type Params = GetCommunityListRequestParams & {
  initPageToken?: number;
};

export const useGetCommunityList = (params: Params): ICommunity[] => {
  const res = useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_LIST_KEY).list({ params, getCommunityURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getCommunityList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });

  return res.data.pages.map((page) => page.data.result.posts).flat();
};

import { useSuspenseInfiniteQuery } from '@/src/queries/query';
import { getCommunityList, getCommunityURL } from '@/src/api/community';
import { getQueryKeys } from '@/src/queries/query-key';
import { type ICommunityParams as GetCommunityListRequestParams, ICommunity } from '@/src/types';
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

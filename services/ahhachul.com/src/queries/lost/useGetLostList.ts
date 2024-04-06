import { useSuspenseInfiniteQuery } from 'queries/query';
import { getLostList, getLostURL } from 'api/lost';
import { getQueryKeys } from 'queries/query-key';
import { type ILostParams as GetLostListRequestParams, ILost } from 'types/lost';
import { LOST_LIST_KEY } from './keys';

type Params = GetLostListRequestParams & {
  initPageToken?: number;
};

export const useGetLostList = (params: Params): ILost[] => {
  const res = useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(LOST_LIST_KEY).list({ params, getLostURL }),
    queryFn: async ({ pageParam = params?.initPageToken }) => {
      return await getLostList({ ...params, page: pageParam });
    },
    initialPageParam: params?.initPageToken,
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
  });

  return res.data.pages.map((page) => page.data.result.posts).flat();
};

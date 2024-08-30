import queryString from 'query-string';

import {
  base,
  routes,
  getQueryKeys,
  useSuspenseInfiniteQuery,
} from 'shared/api';
import type { IResponse } from 'entities/with-server';
import { COMMUNITY_QUERY_KEY } from './query-key';
import type { CommunityList } from '../model';
import type { ParamsOfCommunityList } from '../model/params';

const getCommunityList = (params: ParamsOfCommunityList) =>
  base.get<IResponse<CommunityList>>(
    `${routes.community}?${queryString.stringify(params)}`,
  );

export const useGetCommunityList = (params: ParamsOfCommunityList) =>
  useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_QUERY_KEY).list({ params }),
    queryFn: ({ pageParam = params?.page }) =>
      getCommunityList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
    initialPageParam: params?.page ?? 0,
  });

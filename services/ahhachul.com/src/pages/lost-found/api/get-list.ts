import queryString from 'query-string';

import {
  base,
  routes,
  getQueryKeys,
  useSuspenseInfiniteQuery,
} from 'shared/api';
import type { IResponse } from 'entities/with-server';
import { LOST_FOUND_QUERY_KEY } from './query-key';
import type { LostList } from '../model';
import type { ParamsOfLostFoundList } from '../model/params';

const getLostFoundList = (params: ParamsOfLostFoundList) =>
  base.get<IResponse<LostList>>(
    `${routes['lost-found']}?${queryString.stringify(params)}`,
  );

export const useGetLostFoundList = (params: ParamsOfLostFoundList) =>
  useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).list({ params }),
    queryFn: ({ pageParam = params?.page }) =>
      getLostFoundList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.data.result.nextPageNum,
    initialPageParam: params?.page ?? 0,
  });

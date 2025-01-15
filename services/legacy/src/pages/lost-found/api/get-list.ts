import type { IResponse } from 'entities/with-server';
import { base, routes, getQueryKeys, useInfiniteQuery } from 'shared/api';
import { TIMESTAMP } from 'shared/lib/config/timestamp';
import { objectToQueryString } from 'shared/lib/utils/object/remove-falsy-properties';

import { LOST_FOUND_QUERY_KEY } from './query-key';

import type { LostList } from '../model';
import type { ParamsOfLostFoundList } from '../model/params';

const getLostFoundList = (params: ParamsOfLostFoundList) =>
  base.get<IResponse<LostList>>(
    `${routes['lost-found']}?${objectToQueryString(params, { removeZero: true })}`,
  );

export const useGetLostFoundList = (params: ParamsOfLostFoundList) =>
  useInfiniteQuery({
    queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).list({ params }),
    queryFn: ({ pageParam = params?.pageToken }) =>
      getLostFoundList({
        ...params,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage =>
      lastPage.data.result.hasNext ? lastPage.data.result.pageToken : null,
    initialPageParam: null,
    staleTime: 30 * TIMESTAMP.SECOND,
    throwOnError: true,
  });

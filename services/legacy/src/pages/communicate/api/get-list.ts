import type { IResponse } from 'entities/with-server';
import queryString from 'query-string';
import { base, routes, getQueryKeys, useInfiniteQuery } from 'shared/api';
import { TIMESTAMP } from 'shared/lib/config/timestamp';

import { COMMUNITY_QUERY_KEY } from './query-key';

import type { CommunityList } from '../model';
import type { ParamsOfCommunityList } from '../model/params';

const getCommunityList = (params: ParamsOfCommunityList) =>
  base.get<IResponse<CommunityList>>(`${routes.community}?${queryString.stringify(params)}`);

export const useGetCommunityList = (params: ParamsOfCommunityList) =>
  useInfiniteQuery({
    queryKey: getQueryKeys(COMMUNITY_QUERY_KEY).list({ params }),
    queryFn: ({ pageParam = params?.page }) => getCommunityList({ ...params, page: pageParam }),
    getNextPageParam: lastPage => lastPage.data.result.nextPageNum,
    initialPageParam: params?.page ?? 0,
    gcTime: 5 * TIMESTAMP.MINUTE,
    staleTime: 30 * TIMESTAMP.SECOND,
    throwOnError: true,
  });

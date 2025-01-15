import type { IResponse } from 'entities/with-server';
import queryString from 'query-string';
import { base, routes, getQueryKeys, useSuspenseInfiniteQuery } from 'shared/api';

import { COMPLAINT_QUERY_KEY } from './query-key';

import type { ComplaintList } from '../model';
import type { ParamsOfComplaintList } from '../model/params';

const getComplaintList = (params: ParamsOfComplaintList) =>
  base.get<IResponse<ComplaintList>>(`${routes.complaints}?${queryString.stringify(params)}`);

export const useGetComplaintList = (params: ParamsOfComplaintList) =>
  useSuspenseInfiniteQuery({
    queryKey: getQueryKeys(COMPLAINT_QUERY_KEY).list({ params }),
    queryFn: ({ pageParam = params?.page }) => getComplaintList({ ...params, page: pageParam }),
    getNextPageParam: lastPage => lastPage.data.result.nextPageNum,
    initialPageParam: params?.page ?? 0,
  });

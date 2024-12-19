import {
  keepPreviousData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { apiClient } from '@/app/api';
import type { IResponse, ListResponseWithPagination } from '@/model/Utils';
import type {
  LostFoundPost,
  LostFoundPostDetail,
  LostFoundListParams,
} from '@/model/LostFound';
import { TIMESTAMP } from '@/common/constants/time';
import { generateQueryKey } from '@/common/utils/react-query';
import { objectToQueryString } from '@/common/utils/object';

const getLostFoundList = (params: LostFoundListParams) =>
  apiClient.get<IResponse<ListResponseWithPagination<LostFoundPost>>>(
    `/lost-posts?${objectToQueryString(params, { removeZero: true })}`,
  );

export const useGetLostFoundList = (params: LostFoundListParams) =>
  useSuspenseInfiniteQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).list({ params }),
    queryFn: ({ pageParam = params.pageToken }) =>
      getLostFoundList({
        ...params,
        ...(pageParam && { pageToken: pageParam }),
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.data.result.pageToken,
    gcTime: TIMESTAMP.MINUTE,
    staleTime: TIMESTAMP.SECOND,
  });

const getLostFoundDetail = (id: string) =>
  apiClient.get<IResponse<LostFoundPostDetail>>(`/lost-posts/${id}`);

export const useGetLostFoundDetail = (id: string) => {
  // Todo - id가 빈 값일 경우 어떻게 해야할 지 확인 필요
  if (!id) {
    // id가 없으면 null 반환
    return { data: null };
  }
  return useSuspenseQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).detail(id),
    queryFn: () => getLostFoundDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE,
    select: (res) => res.data.result,
  });
};

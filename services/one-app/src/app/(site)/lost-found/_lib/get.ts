'use client';

import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/app/api';
import { TIMESTAMP } from '@/common/constants';
import { generateQueryKey, objectToQueryString } from '@/common/utils';
import type {
  IResponse,
  ListResponseWithPagination,
  LostFoundPost,
  LostFoundPostDetail,
  LostFoundListParams,
} from '@/model';

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
    getNextPageParam: lastPage => lastPage.data.result.pageToken,
    gcTime: TIMESTAMP.MINUTE,
    staleTime: TIMESTAMP.SECOND,
  });

const getLostFoundDetail = (id: number) =>
  apiClient.get<IResponse<LostFoundPostDetail>>(`/lost-posts/${id}`);

export const useGetLostFoundDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).detail(id),
    queryFn: () => getLostFoundDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE,
    select: res => res.data.result,
  });

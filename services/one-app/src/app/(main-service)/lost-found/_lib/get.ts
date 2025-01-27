'use client';

import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/api/axios';
import { fetchLostFoundList } from '@/api/lost-found/fetchLostFoundList';
import { TIMESTAMP } from '@/constant';
import type { IResponse, LostFoundPostDetail, LostFoundListParams } from '@/model';
import { generateQueryKey } from '@/util';

export const useGetLostFoundList = (params: LostFoundListParams) =>
  useSuspenseInfiniteQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).list({ params }),
    queryFn: ({ pageParam = params.pageToken }) =>
      fetchLostFoundList({
        ...params,
        ...(pageParam && { pageToken: pageParam }),
      }),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage.data.result.pageToken,
    gcTime: TIMESTAMP.MINUTE,
    staleTime: TIMESTAMP.SECOND,
  });

const getLostFoundDetail = (id: number) =>
  axiosInstance.get<IResponse<LostFoundPostDetail>>(`/lost-posts/${id}`);

export const useGetLostFoundDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: generateQueryKey(['LOST_FOUND']).detail(id),
    queryFn: () => getLostFoundDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE,
    select: res => res.data.result,
  });

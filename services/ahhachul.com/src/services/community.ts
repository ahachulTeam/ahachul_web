import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { TIMESTAMP } from '@/constants';
import { type CommunityListParams, type SubwayLineFilterOptions } from '@/types';
import * as formatter from '@/utils/format';

export const communityKeys = {
  all: ['lostFound'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: (string | number)[]) => [...communityKeys.lists(), ...filters] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (id: number) => [...communityKeys.details(), id] as const,
  comments(id: number) {
    return [...this.detail(id), 'comment-list'] as const;
  },
};

export const useFetchCommunityList = (filters: CommunityListParams<SubwayLineFilterOptions>) => {
  const favoriteLine = 2;
  const req = formatter.deleteObjectKeyWithEmptyValue(
    {
      writer: filters.writer,
      content: filters.content,
      categoryType: filters.categoryType,
      subwayLineId: formatter.formatSubwayFilterOption(filters.subwayLineId, favoriteLine),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as CommunityListParams;

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: communityKeys.list(Object.values(req)),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchCommunityList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
  });
};

export const useFetchCommunityDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.detail(id),
    queryFn: () => api.fetchCommunityDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // 5분
    select: res => res.data.result,
  });

export const useFetchCommunityCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.comments(id),
    queryFn: () => api.fetchCommunityCommentList(id),
    staleTime: 5 * TIMESTAMP.MINUTE, //5분
    select: res => res.data.result,
  });

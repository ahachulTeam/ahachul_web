import { useMutation, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import * as api from '@/apis/request';
import { TIMESTAMP } from '@/constants';
import { useFlow } from '@/stackflow';
import type { LostFoundForm, LostFoundListParams, SubwayLineFilterOptions } from '@/types';
import * as formatter from '@/utils/format';

export const lostFoundKeys = {
  all: ['lostFound'] as const,
  lists: () => [...lostFoundKeys.all, 'list'] as const,
  list: (filters: LostFoundListParams<SubwayLineFilterOptions>) =>
    [...lostFoundKeys.lists(), { filters }] as const,
  details: () => [...lostFoundKeys.all, 'detail'] as const,
  detail: (id: number) => [...lostFoundKeys.details(), id] as const,
  comments(id: number) {
    return [...this.detail(id), 'comment-list'] as const;
  },
};

export const useFetchLostFoundList = (filters: LostFoundListParams<SubwayLineFilterOptions>) => {
  const favoriteLine = 3;
  const req = formatter.deleteObjectKeyWithEmptyValue(
    {
      keyword: filters.keyword,
      lostType: filters.lostType,
      subwayLineId: formatter.formatSubwayFilterOption(filters.subwayLineId, favoriteLine),
    },
    { removeZero: true },
  ) as LostFoundListParams;

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: lostFoundKeys.list(filters),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchLostFoundList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
  });
};

export const useCreateLostFound = () => {
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  return useMutation({
    mutationFn: (req: LostFoundForm) => api.createLostFound(req),
    onSuccess: res => {
      pop();
      setTimeout(() => {
        push('LostFoundDetailPage', {
          id: res.result.id,
        });
      }, 500);
    },
    onError: () => {
      // addToast(TOAST_MSG.WARNING.CREATE_FAIL);
    },
  });
};

export const useFetchLostFoundDetail = (id: number) => {
  return useSuspenseQuery({
    queryKey: lostFoundKeys.detail(id),
    queryFn: () => api.fetchLostFoundDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // 5분
    select: res => res.data.result,
  });
};

export const useFetchLostFoundCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: lostFoundKeys.comments(id),
    queryFn: () => api.fetchLostFoundCommentList(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // default: 5분, 글 수정 시에는 따로 업데이트 관리
    select: res => res.data.result,
  });

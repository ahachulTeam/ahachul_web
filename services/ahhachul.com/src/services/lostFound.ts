import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import * as api from '@/apis/request';
import { TIMESTAMP } from '@/constants';
import { useFlow } from '@/stackflow';
import {
  LostFoundType,
  type LostFoundForm,
  type LostFoundEditForm,
  type LostFoundListParams,
  type SubwayLineFilterOptions,
} from '@/types';
import * as formatter from '@/utils/format';

export const lostFoundKeys = {
  all: ['lostFound'] as const,
  lists: () => [...lostFoundKeys.all, 'list'] as const,
  list: (filters: (string | number)[]) => [...lostFoundKeys.lists(), ...filters] as const,
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
      lostType: filters.lostType,
      keyword: filters.keyword,
      subwayLineId: formatter.formatSubwayFilterOption(filters.subwayLineId, favoriteLine),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as LostFoundListParams;

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: lostFoundKeys.list(Object.values(req)),
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

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: LostFoundForm) => api.createLostFound(req),
    onSuccess: (res, req) => {
      pop();

      queryClient.invalidateQueries({
        queryKey: lostFoundKeys.list([req.lostType]),
      });
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

export const useFetchLostFoundDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: lostFoundKeys.detail(id),
    queryFn: () => api.fetchLostFoundDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // 5분
    select: res => res.data.result,
  });

export const useFetchLostFoundCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: lostFoundKeys.comments(id),
    queryFn: () => api.fetchLostFoundCommentList(id),
    staleTime: 5 * TIMESTAMP.MINUTE, //5분
    select: res => res.data.result,
  });

export const useEditLostFound = (id: number, lostType: LostFoundType) => {
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: LostFoundEditForm) => api.editLostFound(id, req),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: lostFoundKeys.list([lostType]),
      });

      pop(2);

      queryClient.invalidateQueries({
        queryKey: lostFoundKeys.detail(id),
      });

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

import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TIMESTAMP } from '@/constants';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import {
  LostFoundType,
  type LostFoundForm,
  type LostFoundEditForm,
  type LostFoundListParams,
  type SubwayLineFilterOptions,
} from '@/types';
import { formatSubwayFilterOption, getFirstParentLineId } from '@/utils';

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
  const state = useUserStationStore(state => state);
  const favoriteLines = getFirstParentLineId(state.stations);

  const req = removeFalsyValues(
    {
      lostType: filters.lostType,
      keyword: filters.keyword,
      subwayLineIds: formatSubwayFilterOption(filters.subwayLineId, favoriteLines),
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
  const { addToast } = useToast();

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
      addToast(TOAST_MSG.WARNING.CREATE_FAIL, 'warning');
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

export const useDeleteLostFound = () => {
  const afterSubmitSuccess = (res: any) => {
    console.log('res:', res);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 식제하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.deleteLostFound,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

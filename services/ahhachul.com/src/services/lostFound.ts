import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  QUERY_GC_TIME,
  QUERY_STALE_TIME,
  buildQuerySignature,
  lostFoundQueryKeys,
} from '@ahhachul/domain';
import { formatSubwayFilterOption, getFirstParentLineId, removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
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

export const lostFoundKeys = lostFoundQueryKeys;

export const useFetchLostFoundList = (filters: LostFoundListParams<SubwayLineFilterOptions>) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);

  const req = removeFalsyValues(
    {
      lostType: filters.lostType,
      keyword: filters.keyword,
      subwayLineIds: formatSubwayFilterOption(filters.subwayLineId, userStations),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as LostFoundListParams;
  const querySignature = buildQuerySignature({
    lostType: req.lostType,
    keyword: req.keyword,
    subwayLineId: req.subwayLineId,
  });

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: lostFoundKeys.list(querySignature),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchLostFoundList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
  });
};

export const useCreateLostFound = () => {
  const { pop, push } = useFlow();
  const { addToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: LostFoundForm) => api.createLostFound(req),
    onSuccess: res => {
      pop();

      queryClient.invalidateQueries({
        queryKey: lostFoundKeys.lists(),
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
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.data.result,
  });

export const useFetchLostFoundCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: lostFoundKeys.comments(id),
    queryFn: () => api.fetchLostFoundCommentList(id),
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.data.result,
  });

export const useEditLostFound = (id: number, _lostType: LostFoundType) => {
  void _lostType;
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: LostFoundEditForm) => api.editLostFound(id, req),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: lostFoundKeys.lists(),
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

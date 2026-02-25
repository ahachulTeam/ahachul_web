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
import { getFirstParentLineId, removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import {
  LostFoundType,
  SubwayLineFilterOptions,
  type LostFoundForm,
  type LostFoundEditForm,
  type LostFoundListParams,
  type LostFoundStationFilterValue,
  type LostFoundSubwayLineFilterValue,
} from '@/types';
import { resolvePostSubmitWarningMessage } from '@/utils/postSubmitError';

const STACK_PUSH_DELAY_MS = 500;

const logMutationError = (context: string, error: Error) => {
  console.error(`[lost-found-service] ${context}`, error);
};

export const lostFoundKeys = lostFoundQueryKeys;

const DEFAULT_STATION_FILTER = '0';

function resolveSubwayLineIds(
  lineFilter: LostFoundSubwayLineFilterValue,
  favoriteLines: string,
): string | undefined {
  if (lineFilter === SubwayLineFilterOptions.ALL_LINES) {
    return undefined;
  }

  if (lineFilter === SubwayLineFilterOptions.ONLY_MY_LINE) {
    return favoriteLines || undefined;
  }

  const parsed = Number(lineFilter);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return String(parsed);
}

function resolveStationId(
  stationFilter: LostFoundStationFilterValue | undefined,
): number | undefined {
  if (!stationFilter || stationFilter === DEFAULT_STATION_FILTER) {
    return undefined;
  }

  const parsed = Number(stationFilter);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export const useFetchLostFoundList = (
  filters: LostFoundListParams<LostFoundSubwayLineFilterValue>,
) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);
  const subwayLineIds = resolveSubwayLineIds(filters.subwayLineId, userStations);
  const stationId = resolveStationId(filters.stationId?.toString() as LostFoundStationFilterValue);

  const req = removeFalsyValues(
    {
      lostType: filters.lostType,
      keyword: filters.keyword,
      subwayLineIds,
      stationId,
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as LostFoundListParams;
  const querySignature = buildQuerySignature({
    lostType: req.lostType,
    keyword: req.keyword,
    subwayLineId: filters.subwayLineId,
    stationId: filters.stationId,
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
      }, STACK_PUSH_DELAY_MS);
    },
    onError: error => {
      addToast(resolvePostSubmitWarningMessage(error, TOAST_MSG.WARNING.CREATE_FAIL), 'warning');
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
      }, STACK_PUSH_DELAY_MS);
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
    logMutationError('failed to delete lost-found post', error);
  };

  return useMutation({
    mutationFn: api.deleteLostFound,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

export const useToggleLostFoundLike = (id: number, liked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (liked ? api.unlikeLostFound(id) : api.likeLostFound(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: lostFoundKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: lostFoundKeys.lists() });
    },
  });
};

export const useToggleLostFoundBookmark = (id: number, bookmarked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (bookmarked ? api.unbookmarkLostFound(id) : api.bookmarkLostFound(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: lostFoundKeys.detail(id) });
    },
  });
};

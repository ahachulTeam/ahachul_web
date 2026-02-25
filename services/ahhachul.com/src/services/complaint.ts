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
  complaintQueryKeys,
} from '@ahhachul/domain';
import { getFirstParentLineId, removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { SubwayLineFilterOptions } from '@/types';
import type {
  ComplaintForm,
  ComplaintListParams,
  ComplaintStationFilterValue,
  ComplaintSubwayLineFilterValue,
} from '@/types/complaint';
import { extractTextFromLexical } from '@/utils/lexical';
import { createActionLogger } from '@/utils/observability';
import { resolvePostSubmitWarningMessage } from '@/utils/postSubmitError';

const STACK_PUSH_DELAY_MS = 500;

const complaintLogger = createActionLogger('complaint-service');

const logMutationError = (context: string, error: Error, fallbackMessage: string) => {
  complaintLogger.fail(context, error, undefined, fallbackMessage);
};

export const complaintKeys = complaintQueryKeys;

const DEFAULT_STATION_FILTER = '0';

function resolveSubwayLineIds(
  lineFilter: ComplaintSubwayLineFilterValue,
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
  stationFilter: ComplaintStationFilterValue | undefined,
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

export const useFetchComplaintList = (
  filters: ComplaintListParams<ComplaintSubwayLineFilterValue>,
) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);
  const subwayLineIds = resolveSubwayLineIds(filters.subwayLineId, userStations);
  const stationId = resolveStationId(filters.stationId?.toString() as ComplaintStationFilterValue);

  const req = removeFalsyValues(
    {
      keyword: filters.keyword,
      subwayLineIds,
      stationId,
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as ComplaintListParams;
  const querySignature = buildQuerySignature({
    keyword: req.keyword,
    subwayLineId: filters.subwayLineId,
    stationId: filters.stationId,
  });

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: complaintKeys.list(querySignature),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchComplaintList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
    select: res => {
      res.pages[res.pages.length - 1].result.data = res.pages[res.pages.length - 1].result.data.map(
        v => ({
          ...v,
          title: extractTextFromLexical(v.content, v.complaintType).slice(0, 20),
        }),
      );
      return res;
    },
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
  });
};

export const useCreateComplaint = () => {
  const { pop, push } = useFlow();
  const { addToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: ComplaintForm) => api.createComplaint(req),
    onSuccess: res => {
      pop();

      queryClient.invalidateQueries({
        queryKey: complaintKeys.lists(),
      });
      setTimeout(() => {
        push('ComplaintDetailPage', {
          id: res.result.id,
        });
      }, STACK_PUSH_DELAY_MS);
    },
    onError: error => {
      logMutationError('create-complaint', error, TOAST_MSG.WARNING.CREATE_FAIL);
      addToast(resolvePostSubmitWarningMessage(error, TOAST_MSG.WARNING.CREATE_FAIL), 'warning');
    },
  });
};

export const useFetchComplaintDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: complaintKeys.detail(id),
    queryFn: () => api.fetchComplaintDetail(id),
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => {
      return {
        ...res.data.result,
        title: extractTextFromLexical(res.data.result.content, res.data.result.complaintType).slice(
          0,
          20,
        ),
      };
    },
  });

export const useFetchComplaintCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: complaintKeys.comments(id),
    queryFn: () => api.fetchComplaintCommentList(id),
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.data.result,
  });

export const useDeleteComplaint = () => {
  const afterSubmitSuccess = (res: any) => {
    complaintLogger.success('delete-complaint', {
      postId: res?.result?.id,
    });
  };
  const afterSubmitFailed = (error: Error) => {
    logMutationError(
      'delete-complaint',
      error,
      '게시글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
    );
  };

  return useMutation({
    mutationFn: api.deleteComplaint,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

export const useToggleComplaintLike = (id: number, liked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (liked ? api.unlikeComplaint(id) : api.likeComplaint(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: complaintKeys.lists() });
    },
  });
};

export const useToggleComplaintBookmark = (id: number, bookmarked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (bookmarked ? api.unbookmarkComplaint(id) : api.bookmarkComplaint(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: complaintKeys.detail(id) });
    },
  });
};

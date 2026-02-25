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
  communityQueryKeys,
} from '@ahhachul/domain';
import { getFirstParentLineId, removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import {
  CommunityType,
  SubwayLineFilterOptions,
  type CommunitySubwayLineFilterValue,
  type CommunityForm,
  type CommunityEditForm,
  type CommunityListParams,
} from '@/types';
import { createActionLogger } from '@/utils/observability';
import { resolvePostSubmitWarningMessage } from '@/utils/postSubmitError';

const STACK_PUSH_DELAY_MS = 500;

const communityLogger = createActionLogger('community-service');

const logMutationError = (context: string, error: Error, fallbackMessage: string) => {
  communityLogger.fail(context, error, undefined, fallbackMessage);
};

export const communityKeys = communityQueryKeys;

const DEFAULT_STATION_FILTER = '0';

function resolveSubwayLineIds(
  lineFilter: CommunitySubwayLineFilterValue,
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

function resolveStationId(stationFilter: string | undefined): number | undefined {
  if (!stationFilter || stationFilter === DEFAULT_STATION_FILTER) {
    return undefined;
  }

  const parsed = Number(stationFilter);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
}

export const useFetchCommunityList = (
  filters: CommunityListParams<CommunitySubwayLineFilterValue>,
) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);
  const subwayLineIds = resolveSubwayLineIds(filters.subwayLineId, userStations);
  const stationId = resolveStationId(filters.stationId?.toString());

  const req = removeFalsyValues(
    {
      writer: filters.writer,
      content: filters.content,
      hashTag: filters.hashTag,
      categoryType: filters.categoryType,
      subwayLineIds,
      stationId,
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as Record<string, string | number>;
  const querySignature = buildQuerySignature({
    categoryType: filters.categoryType,
    writer: filters.writer,
    content: filters.content,
    hashTag: filters.hashTag,
    subwayLineId: filters.subwayLineId,
    stationId: filters.stationId,
  });

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: communityKeys.list(querySignature),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchCommunityList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
  });
};

export const useCreateCommunity = () => {
  const { pop, push } = useFlow();
  const { addToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: CommunityForm) => api.createCommunity(req),
    onSuccess: res => {
      pop();

      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
      setTimeout(() => {
        push('CommunityDetailPage', {
          id: res.result.id,
        });
      }, STACK_PUSH_DELAY_MS);
    },
    onError: error => {
      logMutationError('create-community', error, TOAST_MSG.WARNING.CREATE_FAIL);
      addToast(resolvePostSubmitWarningMessage(error, TOAST_MSG.WARNING.CREATE_FAIL), 'warning');
    },
  });
};

export const useFetchCommunityDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.detail(id),
    queryFn: () => api.fetchCommunityDetail(id),
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.data.result,
  });

export const useFetchCommunityCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.comments(id),
    queryFn: () => api.fetchCommunityCommentList(id),
    staleTime: QUERY_STALE_TIME.detail,
    gcTime: QUERY_GC_TIME.detail,
    select: res => res.data.result,
  });

export const useEditCommunity = (id: number, _categoryType: CommunityType) => {
  void _categoryType;
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CommunityEditForm) => api.editCommunity(id, req),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });

      pop(2);

      queryClient.invalidateQueries({
        queryKey: communityKeys.detail(id),
      });

      setTimeout(() => {
        push('LostFoundDetailPage', {
          id: res.result.id,
        });
      }, STACK_PUSH_DELAY_MS);
    },
    onError: error => {
      logMutationError('edit-community', error, TOAST_MSG.WARNING.CREATE_FAIL);
      // addToast(TOAST_MSG.WARNING.CREATE_FAIL);
    },
  });
};

export const useDeleteCommunity = () => {
  const afterSubmitSuccess = (res: any) => {
    communityLogger.success('delete-community', {
      postId: res?.result?.id,
    });
  };
  const afterSubmitFailed = (error: Error) => {
    logMutationError(
      'delete-community',
      error,
      '게시글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.',
    );
  };

  return useMutation({
    mutationFn: api.deleteCommunity,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

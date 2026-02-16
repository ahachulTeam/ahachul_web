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
import { formatSubwayFilterOption, getFirstParentLineId, removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import {
  CommunityType,
  type CommunityForm,
  type CommunityEditForm,
  type CommunityListParams,
  type SubwayLineFilterOptions,
} from '@/types';

export const communityKeys = communityQueryKeys;

export const useFetchCommunityList = (filters: CommunityListParams<SubwayLineFilterOptions>) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);

  const req = removeFalsyValues(
    {
      writer: filters.writer,
      content: filters.content,
      hashTag: filters.hashTag,
      categoryType: filters.categoryType,
      subwayLineIds: formatSubwayFilterOption(filters.subwayLineId, userStations),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as CommunityListParams;
  const querySignature = buildQuerySignature({
    categoryType: req.categoryType,
    writer: req.writer,
    content: req.content,
    hashTag: req.hashTag,
    subwayLineId: req.subwayLineId,
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
      }, 500);
    },
    onError: error => {
      console.log('error:', error);
      addToast(TOAST_MSG.WARNING.CREATE_FAIL, 'warning');
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
      }, 500);
    },
    onError: () => {
      // addToast(TOAST_MSG.WARNING.CREATE_FAIL);
    },
  });
};

export const useDeleteCommunity = () => {
  const afterSubmitSuccess = (res: any) => {
    console.log('res:', res);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 식제하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.deleteCommunity,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

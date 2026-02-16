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
import { removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TOAST_MSG } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { SubwayLineFilterOptions } from '@/types';
import type { ComplaintForm, ComplaintListParams } from '@/types/complaint';
import { formatSubwayFilterOption, getFirstParentLineId } from '@/utils';
import { extractTextFromLexical } from '@/utils/lexical';

export const complaintKeys = complaintQueryKeys;

export const useFetchComplaintList = (filters: ComplaintListParams<SubwayLineFilterOptions>) => {
  const state = useUserStationStore(state => state);
  const userStations = getFirstParentLineId(state.userStations);

  const req = removeFalsyValues(
    {
      keyword: filters.keyword,
      subwayLineIds: formatSubwayFilterOption(filters.subwayLineId, userStations),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as ComplaintListParams;
  const querySignature = buildQuerySignature({
    keyword: req.keyword,
    subwayLineId: req.subwayLineId,
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
      }, 500);
    },
    onError: () => {
      addToast(TOAST_MSG.WARNING.CREATE_FAIL, 'warning');
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
    console.log('res:', res);
  };
  const afterSubmitFailed = (error: Error) => {
    // 토스트 띄어주고 뒤로 가기
    console.log('error with toast:', error, '토스트 띄어주고 뒤로 가기');
    window.alert('댓글 식제하다가 에러 발생');
  };

  return useMutation({
    mutationFn: api.deleteComplaint,
    onError: afterSubmitFailed,
    onSuccess: afterSubmitSuccess,
  });
};

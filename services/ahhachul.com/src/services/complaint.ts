import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { removeFalsyValues } from '@ahhachul/utils';

import * as api from '@/apis/request';
import { TIMESTAMP } from '@/constants';
import { useFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { SubwayLineFilterOptions } from '@/types';
import type { ComplaintForm, ComplaintListParams } from '@/types/complaint';
import { formatSubwayFilterOption, getFirstParentLineId } from '@/utils';
import { extractTextFromLexical } from '@/utils/lexical';

export const complaintKeys = {
  all: ['complaint'] as const,
  lists: () => [...complaintKeys.all, 'list'] as const,
  list: (filters: (string | number)[]) => [...complaintKeys.lists(), ...filters] as const,
  details: () => [...complaintKeys.all, 'detail'] as const,
  detail: (id: number) => [...complaintKeys.details(), id] as const,
  comments(id: number) {
    return [...this.detail(id), 'comment-list'] as const;
  },
};

export const useFetchComplaintList = (filters: ComplaintListParams<SubwayLineFilterOptions>) => {
  const state = useUserStationStore(state => state);
  const favoriteLine = getFirstParentLineId(state.stations);

  const req = removeFalsyValues(
    {
      keyword: filters.keyword,
      subwayLineIds: formatSubwayFilterOption(filters.subwayLineId, favoriteLine),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as ComplaintListParams;

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: complaintKeys.list(Object.values(req)),
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
  });
};

export const useCreateComplaint = () => {
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

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
      // addToast(TOAST_MSG.WARNING.CREATE_FAIL);
    },
  });
};

export const useFetchComplaintDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: complaintKeys.detail(id),
    queryFn: () => api.fetchComplaintDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // 5분
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
    staleTime: 5 * TIMESTAMP.MINUTE, //5분
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

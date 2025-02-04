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
import {
  CommunityType,
  type CommunityForm,
  type CommunityEditForm,
  type CommunityListParams,
  type SubwayLineFilterOptions,
} from '@/types';
import { formatSubwayFilterOption } from '@/utils';

export const communityKeys = {
  all: ['community'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: (string | number)[]) => [...communityKeys.lists(), ...filters] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (id: number) => [...communityKeys.details(), id] as const,
  comments(id: number) {
    return [...this.detail(id), 'comment-list'] as const;
  },
};

export const useFetchCommunityList = (filters: CommunityListParams<SubwayLineFilterOptions>) => {
  const favoriteLine = 2;
  const req = removeFalsyValues(
    {
      categoryType: filters.categoryType,
      content: filters.content,
      writer: filters.writer,
      subwayLineId: formatSubwayFilterOption(filters.subwayLineId, favoriteLine),
    },
    { removeZero: true, removeEmptyStrings: true },
  ) as CommunityListParams;

  return useSuspenseInfiniteQuery({
    initialPageParam: '',
    queryKey: communityKeys.list(Object.values(req)),
    queryFn: ({ pageParam = filters.pageToken }) =>
      api.fetchCommunityList({
        ...req,
        ...(pageParam && { pageToken: pageParam }),
      }),
    getNextPageParam: lastPage => lastPage.result.pageToken,
  });
};

export const useCreateCommunity = () => {
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: CommunityForm) => api.createCommunity(req),
    onSuccess: (res, req) => {
      pop();

      queryClient.invalidateQueries({
        queryKey: communityKeys.list([req.categoryType]),
      });
      setTimeout(() => {
        push('CommunityDetailPage', {
          id: res.result.id,
        });
      }, 500);
    },
    onError: () => {
      // addToast(TOAST_MSG.WARNING.CREATE_FAIL);
    },
  });
};

export const useFetchCommunityDetail = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.detail(id),
    queryFn: () => api.fetchCommunityDetail(id),
    staleTime: 5 * TIMESTAMP.MINUTE, // 5분
    select: res => res.data.result,
  });

export const useFetchCommunityCommentList = (id: number) =>
  useSuspenseQuery({
    queryKey: communityKeys.comments(id),
    queryFn: () => api.fetchCommunityCommentList(id),
    staleTime: 5 * TIMESTAMP.MINUTE, //5분
    select: res => res.data.result,
  });

export const useEditCommunity = (id: number, categoryType: CommunityType) => {
  const { pop, push } = useFlow();
  // const { addToast } = useToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CommunityEditForm) => api.editCommunity(id, req),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.list([categoryType]),
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

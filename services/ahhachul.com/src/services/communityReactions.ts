import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as api from '@/apis/request';

import { communityKeys } from './community';

export const useToggleCommunityLike = (id: number, liked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (liked ? api.unlikeCommunity(id) : api.likeCommunity(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: communityKeys.detail(id) });
      await queryClient.invalidateQueries({ queryKey: communityKeys.lists() });
    },
  });
};

export const useToggleCommunityBookmark = (id: number, bookmarked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (bookmarked ? api.unbookmarkCommunity(id) : api.bookmarkCommunity(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: communityKeys.detail(id) });
    },
  });
};

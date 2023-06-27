import type * as type from '@/types/community'

export const communityKeys = {
  all: ['community'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: type.CommunityListQueryModel) => [...communityKeys.lists(), { filters }] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (postId: number) => [...communityKeys.details(), postId] as const,
}

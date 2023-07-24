import type * as type from '@/types/lost'

export const lostKeys = {
  all: ['lost'] as const,
  lists: () => [...lostKeys.all, 'list'] as const,
  list: (filters: Partial<type.LostPostsRequest>) => [...lostKeys.lists(), filters] as const,
  details: () => [...lostKeys.all, 'detail'] as const,
  detail: (id: string) => [...lostKeys.details(), id] as const,
}

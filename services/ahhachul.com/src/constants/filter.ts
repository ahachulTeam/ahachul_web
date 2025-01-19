import { AppUniqueFilterId } from '@/types/filter';

export const APP_UNIQUE_FILTER_ID_LIST: Record<AppUniqueFilterId, AppUniqueFilterId> = {
  CommunityPage: 'CommunityPage',
  LostFoundPage: 'LostFoundPage',
} as const;

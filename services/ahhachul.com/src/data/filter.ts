import { LostFoundType, SubwayLineFilterOptions } from '@ahhachul/schemas';

import { AppUniqueFilterId } from '@/types/filter';

export const APP_UNIQUE_FILTER_ID_LIST: Record<AppUniqueFilterId, AppUniqueFilterId> = {
  CommunityPage: 'CommunityPage',
  LostFoundPage: 'LostFoundPage',
} as const;

export const DefaultLostFoundFilterValues = {
  lostType: LostFoundType.LOST,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
};

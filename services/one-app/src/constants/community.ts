import { SubwayLineFilterOptions } from '@/types';
import { CommunityType } from '@/types/community';

export const defaultCommunityFilterValues = {
  category: CommunityType.HOT,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
  stationId: '0',
} as const;

export const communityTypeOptions = {
  [CommunityType.HOT]: '인기',
  [CommunityType.FREE]: '자유',
  [CommunityType.HUMOR]: '유머',
  [CommunityType.INSIGHT]: '정보',
};

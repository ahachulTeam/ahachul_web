import { CommunityType, SubwayLineFilterOptions } from '@/types';

export const communityFilterKeys = {
  communityType: 'communityType',
  subwayLineId: 'subwayLineId',
} as const;

export const defaultCommunityFilterValues = {
  communityType: CommunityType.HOT,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
} as const;

export const communityTypeOptions = {
  [CommunityType.HOT]: '인기',
  [CommunityType.FREE]: '자유',
  [CommunityType.HUMOR]: '유머',
  [CommunityType.INSIGHT]: '정보',
} as const;

export const communityTypeFormOptions = {
  [CommunityType.FREE]: '자유',
  [CommunityType.HUMOR]: '유머',
  [CommunityType.INSIGHT]: '정보',
} as const;

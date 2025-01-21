import { CommunityType, SubwayLineFilterOptions } from '@/types';

export const communityFilterKeys = {
  communityType: 'communityType',
  subwayLineId: 'subwayLineId',
} as const;

export const defaultCommunityFilterValues = {
  communityType: CommunityType.FREE,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
} as const;

export const communityTypeOptions = {
  [CommunityType.FREE]: '자유',
  [CommunityType.HUMOR]: '유머',
  [CommunityType.INSIGHT]: '정보',
  [CommunityType.QUESTION]: '질문',
} as const;

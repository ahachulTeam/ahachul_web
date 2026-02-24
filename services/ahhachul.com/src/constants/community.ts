import { CommunityType, SubwayLineFilterOptions } from '@/types';

export const communityFilterKeys = {
  communityType: 'communityType',
  subwayLineId: 'subwayLineId',
  stationId: 'stationId',
} as const;

export const defaultCommunityFilterValues = {
  hashTag: '',
  communityType: CommunityType.HOT,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
  stationId: '0',
} as const;

export const communityTypeOptions = {
  [CommunityType.HOT]: '인기',
  [CommunityType.FREE]: '자유',
  [CommunityType.ISSUE]: '이슈',
  [CommunityType.INSIGHT]: '정보',
} as const;

export const communityTypeFormOptions = {
  [CommunityType.FREE]: '자유',
  [CommunityType.ISSUE]: '이슈',
  [CommunityType.INSIGHT]: '정보',
} as const;

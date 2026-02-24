import { LostFoundType, SubwayLineFilterOptions } from '@/types';

export const lostFoundFilterKeys = {
  lostType: 'lostType',
  subwayLineId: 'subwayLineId',
  stationId: 'stationId',
} as const;

export const defaultLostFoundFilterValues = {
  lostType: LostFoundType.LOST,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
  stationId: '0',
} as const;

export const lostFoundTypeOptions = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
} as const;

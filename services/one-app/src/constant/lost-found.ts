import { LostFoundType, SubwayLineFilterOptions } from '@/types';

export const defaultLostFoundFilterValues = {
  category: LostFoundType.LOST,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
} as const;

export const lostTypeOptions = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
};

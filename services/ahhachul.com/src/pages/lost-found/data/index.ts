import { SubwayLineFilterOptions } from 'features/subway-lines';
import { LostFoundType } from '../model';

export const LOST_FOUND_FILTER_DEFAULT_VALUES = {
  type: LostFoundType.LOST,
  line: SubwayLineFilterOptions.ALL,
};

export const TYPE_OPTIONS = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
};

import { SubwayLineFilterOptions } from 'features/subway-lines';

import { CommunityCategoryType } from '../model';

export const COMMUNITY_FILTER_DEFAULT_VALUES = {
  category: CommunityCategoryType.HOT,
  line: SubwayLineFilterOptions.ALL,
};

export const CATEGORY_OPTIONS = {
  [CommunityCategoryType.HOT]: '인기',
  [CommunityCategoryType.FREE]: '자유',
  [CommunityCategoryType.INSIGHT]: '정보',
  [CommunityCategoryType.QUESTION]: '질문',
};

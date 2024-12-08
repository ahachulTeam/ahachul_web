import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';
import { createFilterStoreWithPersist } from 'widgets/filters/slice/filters';
import { COMMUNITY_FILTER_DEFAULT_VALUES } from '../data';

export const useCommunityFilterStore = createFilterStoreWithPersist(
  COMMUNITY_FILTER_DEFAULT_VALUES,
  APP_UNIQUE_FILTER_ID_LIST.Community,
);

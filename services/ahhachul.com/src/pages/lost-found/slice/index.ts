import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';
import { createFilterStoreWithPersist } from 'widgets/filters/slice/filters';
import { LOST_FOUND_FILTER_DEFAULT_VALUES } from 'pages/lost-found/data';

export const lostFoundUniqueFilterId = APP_UNIQUE_FILTER_ID_LIST.LostFound;

export const useLostFoundFilterStore = createFilterStoreWithPersist(
  LOST_FOUND_FILTER_DEFAULT_VALUES,
  lostFoundUniqueFilterId,
);

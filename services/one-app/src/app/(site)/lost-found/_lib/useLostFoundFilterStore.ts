'use client';

import { useQueryState } from 'nuqs';

import {
  APP_UNIQUE_FILTER_ID_LIST,
  FilterState,
  createFilterStoreWithPersist,
} from '@/store/filter';
import { SubwayLineFilterOptions } from '@/model/Subway';
import { LostFoundType, type LostFoundFilters } from '@/model/LostFound';

const LOST_FOUND_FILTER_DEFAULT_VALUES: LostFoundFilters = {
  lostType: LostFoundType.LOST,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
} as const;

export const useLostFoundFilters = () => {
  const [keyword] = useQueryState('keyword');
  const { filters, loaded, activedCount, handleSelect, handleReset } =
    createFilterStoreWithPersist<LostFoundFilters>(
      LOST_FOUND_FILTER_DEFAULT_VALUES,
      APP_UNIQUE_FILTER_ID_LIST.LOST_FOUND,
    )();

  const boundaryKeys = [...Object.values(filters), keyword];

  const getFilterProps = (): Omit<FilterState<LostFoundFilters>, 'loaded'> => ({
    filters,
    activedCount,
    handleSelect,
    handleReset,
  });

  return {
    loaded,
    filters,
    keyword,
    boundaryKeys,
    getFilterProps,
  };
};

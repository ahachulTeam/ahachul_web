'use client';

import { useQueryState } from 'nuqs';

import { FilterState, APP_UNIQUE_FILTER_ID_LIST, createFilterStoreWithPersist } from '@/store';
import { LostFoundType, type LostFoundFilters } from '@/types';
import { SubwayLineFilterOptions } from '@/types';

const LOST_FOUND_FILTER_DEFAULT_VALUES: LostFoundFilters = {
  lostType: LostFoundType.LOST,
  subwayLineId: SubwayLineFilterOptions.ALL_LINES,
} as const;

export const useLostFoundFilters = () => {
  const [keyword] = useQueryState('keyword');
  const { filters, loaded, activatedCount, handleSelect, handleReset } =
    createFilterStoreWithPersist<LostFoundFilters>(
      LOST_FOUND_FILTER_DEFAULT_VALUES,
      APP_UNIQUE_FILTER_ID_LIST.LOST_FOUND,
    )();

  const boundaryKeys = [...Object.values(filters), keyword];

  const getFilterProps = (): Omit<FilterState<LostFoundFilters>, 'loaded'> => ({
    filters,
    activatedCount,
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

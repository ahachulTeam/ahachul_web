import type { LostFoundFilters } from '@ahhachul/schemas';

import { APP_UNIQUE_FILTER_ID_LIST, DefaultLostFoundFilterValues } from '@/data/filter';
import { useActivity } from '@/stackflow';
import { filterStore } from '@/stores';
import { IFilterState } from '@/types/filter';

const useLostFoundFilters = () => {
  const {
    params: { keyword },
  } = useActivity();
  const { filters, loaded, activatedCount, handleSelect, handleReset } =
    filterStore<LostFoundFilters>(
      DefaultLostFoundFilterValues,
      APP_UNIQUE_FILTER_ID_LIST.LostFoundPage,
    )();

  const boundaryKeys = [...Object.values(filters), keyword];

  const getFilterProps = (): Omit<IFilterState<LostFoundFilters>, 'loaded'> => ({
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

export default useLostFoundFilters;

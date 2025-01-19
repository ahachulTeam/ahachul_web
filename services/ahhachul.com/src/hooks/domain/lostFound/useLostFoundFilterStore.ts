import { defaultLostFoundFilterValues } from '@/constants';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useActivity } from '@/stackflow';
import { filterStore } from '@/stores';
import type { IFilterState } from '@/stores/filter';
import type { LostFoundFilters } from '@/types/lostFound';

const useLostFoundFilters = () => {
  const {
    params: { keyword },
  } = useActivity();

  const { filters, loaded, activatedCount, handleSelect, handleReset } =
    filterStore<LostFoundFilters>(
      defaultLostFoundFilterValues,
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

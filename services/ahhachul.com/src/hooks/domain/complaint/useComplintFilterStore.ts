import { defaultComplaintFilterValues } from '@/constants';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useActivity } from '@/stackflow';
import { filterStore } from '@/stores';
import type { IFilterState } from '@/stores/filter';
import type { ComplaintFilters } from '@/types/complaint';

const useComplintFilters = () => {
  const {
    params: { keyword = '' },
  } = useActivity();

  const { filters, loaded, activatedCount, handleSelect, handleReset } =
    filterStore<ComplaintFilters>(
      defaultComplaintFilterValues,
      APP_UNIQUE_FILTER_ID_LIST.ComplaintPage,
    )();

  const boundaryKeys = [...Object.values(filters), keyword];

  const getFilterProps = (): Omit<IFilterState<ComplaintFilters>, 'loaded'> => ({
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

export default useComplintFilters;

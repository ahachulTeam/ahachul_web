import { defaultCommunityFilterValues } from '@/constants';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useActivity } from '@/stackflow';
import { filterStore } from '@/stores';
import type { IFilterState } from '@/stores/filter';
import type { CommunityFilters } from '@/types';
import type { AppUniqueFilterId } from '@/types/filter';

type UseCommunityFiltersOptions = {
  uniqueId?: AppUniqueFilterId;
  defaultFilters?: Partial<CommunityFilters>;
};

const useCommunityFilters = ({
  uniqueId = APP_UNIQUE_FILTER_ID_LIST.CommunityPage,
  defaultFilters,
}: UseCommunityFiltersOptions = {}) => {
  const scopedDefaultFilterValues = {
    ...defaultCommunityFilterValues,
    ...defaultFilters,
  } as CommunityFilters;

  const {
    params: { keyword = '' },
  } = useActivity();

  const { filters, loaded, activatedCount, handleSelect, handleReset } =
    filterStore<CommunityFilters>(scopedDefaultFilterValues, uniqueId)();

  const boundaryKeys = [...Object.values(filters), keyword];

  const getFilterProps = (): Omit<IFilterState<CommunityFilters>, 'loaded'> => ({
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

export default useCommunityFilters;

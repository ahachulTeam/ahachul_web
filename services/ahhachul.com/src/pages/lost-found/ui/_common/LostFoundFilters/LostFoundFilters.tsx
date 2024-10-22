import React from 'react';
import {
  LOST_FOUND_FILTER_DEFAULT_VALUES,
  TYPE_OPTIONS,
} from 'pages/lost-found/data';
import { useLostFoundFilterStore } from 'pages/lost-found/slice';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { LINE_OPTIONS } from 'features/subway-lines/data';
import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';

interface LostFoundFiltersProps {
  isScale: boolean;
  handleScale: () => void;
}

export const LostFoundFilters: React.FC<LostFoundFiltersProps> = ({
  isScale,
  handleScale,
}) => {
  const { filters, activeFilterCount, setFilter, resetFilters } =
    useLostFoundFilterStore();

  return (
    <FilterGroup
      isScale={isScale}
      uniqueId={APP_UNIQUE_FILTER_ID_LIST.LostFound}
      activeFilterCount={activeFilterCount}
      handleScale={handleScale}
      resetFilters={resetFilters}
    >
      <FilterGroup.DropdownFilter
        filterKey="type"
        filters={filters}
        optionList={TYPE_OPTIONS}
        buttonLabel={TYPE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.type]}
        handleChange={setFilter}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        filters={filters}
        optionList={LINE_OPTIONS}
        buttonLabel={LINE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.line]}
        handleChange={setFilter}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

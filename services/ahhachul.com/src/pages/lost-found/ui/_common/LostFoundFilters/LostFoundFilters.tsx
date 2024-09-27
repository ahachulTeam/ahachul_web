import React from 'react';
import {
  lostFoundUniqueFilterId,
  useLostFoundFilterStore,
} from 'pages/lost-found/slice';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { LINE_OPTIONS } from 'features/subway-lines/data';
import {
  LOST_FOUND_FILTER_DEFAULT_VALUES,
  TYPE_OPTIONS,
} from 'pages/lost-found/data';

interface LostFoundFiltersProps {
  isScale: boolean;
  handleScale: () => void;
}

export const LostFoundFilters: React.FC<LostFoundFiltersProps> = ({
  isScale,
  handleScale,
}) => {
  const { filters, setFilter, resetFilters, controlledFilterLength } =
    useLostFoundFilterStore();

  return (
    <FilterGroup
      isScale={isScale}
      uniqueId={lostFoundUniqueFilterId}
      controlledFilterLength={controlledFilterLength}
      handleScale={handleScale}
      resetFilters={resetFilters}
    >
      <FilterGroup.DropdownFilter
        filterKey="type"
        filters={filters}
        optionList={TYPE_OPTIONS}
        buttonLabel={TYPE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.type]}
        handleSetFilter={setFilter}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        filters={filters}
        optionList={LINE_OPTIONS}
        buttonLabel={LINE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.line]}
        handleSetFilter={setFilter}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

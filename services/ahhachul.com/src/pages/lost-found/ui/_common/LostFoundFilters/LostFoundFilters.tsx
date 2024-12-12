import React from 'react';
import {
  LOST_FOUND_FILTER_DEFAULT_VALUES,
  TYPE_OPTIONS,
} from 'pages/lost-found/data';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { LINE_OPTIONS } from 'features/subway-lines/data';
import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';
import { FilterState } from 'widgets/filters/slice/filters';
import { LostFoundType } from 'pages/lost-found/model';
import { SubwayLineFilterOptions } from 'features/subway-lines';

interface LostFoundFiltersProps {
  isScale: boolean;
  handleScale: () => void;
  filterProps: FilterState<{
    lostType: LostFoundType;
    subwayLineId: SubwayLineFilterOptions;
  }>;
}

export const LostFoundFilters: React.FC<LostFoundFiltersProps> = ({
  isScale,
  filterProps,
  handleScale,
}) => {
  return (
    <FilterGroup
      isScale={isScale}
      uniqueId={APP_UNIQUE_FILTER_ID_LIST.LostFound}
      activeFilterCount={filterProps.activeCount}
      handleScale={handleScale}
      resetFilters={filterProps.handleReset}
    >
      <FilterGroup.DropdownFilter
        filterKey="lostType"
        filters={filterProps.filters}
        optionList={TYPE_OPTIONS}
        buttonLabel={TYPE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.lostType]}
        handleChange={filterProps.handleSelect}
      />
      <FilterGroup.DropdownFilter
        filterKey="subwayLineId"
        filters={filterProps.filters}
        optionList={LINE_OPTIONS}
        buttonLabel={
          LINE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.subwayLineId]
        }
        handleChange={filterProps.handleSelect}
      />
    </FilterGroup>
  );
};

import React from 'react';
import {
  CATEGORY_OPTIONS,
  COMMUNITY_FILTER_DEFAULT_VALUES,
} from 'pages/communicate/data';
import { useCommunityFilterStore } from 'pages/communicate/slice';
import { LINE_OPTIONS } from 'features/subway-lines/data';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';

interface CommunityFiltersProps {
  isScale: boolean;
  handleScale: () => void;
}

export const CommunityFilters: React.FC<CommunityFiltersProps> = ({
  isScale,
  handleScale,
}) => {
  const { filters, activeCount, handleSelect, handleReset } =
    useCommunityFilterStore();

  return (
    <FilterGroup
      isScale={isScale}
      uniqueId={APP_UNIQUE_FILTER_ID_LIST.Community}
      activeFilterCount={activeCount}
      handleScale={handleScale}
      resetFilters={handleReset}
    >
      <FilterGroup.DropdownFilter
        filterKey="category"
        filters={filters}
        optionList={CATEGORY_OPTIONS}
        buttonLabel={CATEGORY_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.category]}
        handleChange={handleSelect}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        filters={filters}
        optionList={LINE_OPTIONS}
        buttonLabel={LINE_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.line]}
        handleChange={handleSelect}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

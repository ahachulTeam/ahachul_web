import React from 'react';
import {
  CATEGORY_OPTIONS,
  COMMUNITY_FILTER_DEFAULT_VALUES,
} from 'pages/communicate/data';
import {
  communityUniqueFilterId,
  useCommunityFilterStore,
} from 'pages/communicate/slice';
import { LINE_OPTIONS } from 'features/subway-lines/data';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';

interface CommunityFiltersProps {
  isScale: boolean;
  handleScale: () => void;
}

export const CommunityFilters: React.FC<CommunityFiltersProps> = ({
  isScale,
  handleScale,
}) => {
  const { filters, setFilter, resetFilters, controlledFilterLength } =
    useCommunityFilterStore();

  return (
    <FilterGroup
      isScale={isScale}
      uniqueId={communityUniqueFilterId}
      controlledFilterLength={controlledFilterLength}
      handleScale={handleScale}
      resetFilters={resetFilters}
    >
      <FilterGroup.DropdownFilter
        filterKey="category"
        filters={filters}
        optionList={CATEGORY_OPTIONS}
        buttonLabel={CATEGORY_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.category]}
        handleSetFilter={setFilter}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        filters={filters}
        optionList={LINE_OPTIONS}
        buttonLabel={LINE_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.line]}
        handleSetFilter={setFilter}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

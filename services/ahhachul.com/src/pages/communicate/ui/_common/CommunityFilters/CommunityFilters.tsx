import React from 'react';
import { COMMUNITY_FILTER_DEFAULT_VALUES } from 'pages/communicate/data';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';

interface CommunityFiltersProps {
  isScale: boolean;
  isActive: boolean;
  handleScale: () => void;
}

const CATEGORY_OPTIONS = {
  HOT: '인기',
  FREE: '자유',
  INSIGHT: '정보',
  QUESTION: '질문',
};

const LINE_OPTIONS = {
  allLines: '전체 호선 보기',
  onlyMyLine: '내 호선만 보기',
};

export const CommunityFilters: React.FC<CommunityFiltersProps> = ({
  isScale,
  isActive,
  handleScale,
}) => {
  return (
    <FilterGroup
      isScale={isScale}
      isActive={isActive}
      handleScale={handleScale}
    >
      <FilterGroup.DropdownFilter
        filterKey="category"
        buttonLabel={CATEGORY_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.category]}
        options={CATEGORY_OPTIONS}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        buttonLabel={LINE_OPTIONS[COMMUNITY_FILTER_DEFAULT_VALUES.line]}
        options={LINE_OPTIONS}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

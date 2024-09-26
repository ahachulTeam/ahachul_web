<<<<<<< HEAD
import { LOST_FOUND_FILTER_DEFAULT_VALUES } from 'pages/lost-found/data';
=======
>>>>>>> main
import React from 'react';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';

interface LostFoundFiltersProps {
  isScale: boolean;
  isActive: boolean;
  handleScale: () => void;
}

<<<<<<< HEAD
=======
export const LOST_FOUND_FILTER_DEFAULT_VALUES = {
  type: 'LOST',
  line: 'allLines',
  search: '',
};

>>>>>>> main
const TYPE_OPTIONS = {
  LOST: '분실물',
  ACQUIRE: '습득물',
};

const LINE_OPTIONS = {
  allLines: '전체 호선 보기',
  onlyMyLine: '내 호선만 보기',
};

export const LostFoundFilters: React.FC<LostFoundFiltersProps> = ({
  isScale,
  isActive,
  handleScale,
}) => {
  return (
    <FilterGroup
<<<<<<< HEAD
      isScale={isScale}
      isActive={isActive}
=======
      id="lostFound"
      isScale={isScale}
      isActive={isActive}
      defaultValues={LOST_FOUND_FILTER_DEFAULT_VALUES}
>>>>>>> main
      handleScale={handleScale}
    >
      <FilterGroup.DropdownFilter
        filterKey="type"
        buttonLabel={TYPE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.type]}
        options={TYPE_OPTIONS}
      />
      <FilterGroup.DropdownFilter
        filterKey="line"
        buttonLabel={LINE_OPTIONS[LOST_FOUND_FILTER_DEFAULT_VALUES.line]}
        options={LINE_OPTIONS}
      />
      <FilterGroup.DrawerFilter buttonLabel="작성자" title="작성자별 필터링" />
    </FilterGroup>
  );
};

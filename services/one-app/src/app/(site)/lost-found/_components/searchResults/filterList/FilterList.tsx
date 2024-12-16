import React from 'react';
import { FilterState } from '@/store/filter';
import { LostFoundFilters, LostFoundType } from '@/model/LostFound';
import { DropdownFilter } from '@/common/components/Filters/DropdownFilter';
import { subwayLineIdOptions } from '@/common/constants/subway';
import ResetFilter from '@/common/components/Filters/ResetFilter';
import SearchFilter from '@/common/components/Filters/SearchFilter';

const lostTypeOptions = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
};

interface LostFoundFilterListProps
  extends Omit<FilterState<LostFoundFilters>, 'loaded'> {}

const LostFoundFilterList = ({
  filters,
  activedCount,
  handleSelect,
  handleReset,
}: LostFoundFilterListProps) => {
  return (
    <section className=" flex flex-col gap-4">
      <SearchFilter />
      <div>
        <ResetFilter activedCount={activedCount} handleReset={handleReset} />
        <DropdownFilter
          name="lostType"
          filters={filters}
          options={lostTypeOptions}
          onSelect={handleSelect}
        />
        <DropdownFilter
          name="subwayLineId"
          filters={filters}
          options={subwayLineIdOptions}
          onSelect={handleSelect}
        />
      </div>
    </section>
  );
};

export default LostFoundFilterList;

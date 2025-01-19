<<<<<<< HEAD
import { ResetFilter, SearchFilter, DropdownFilter } from '@/common/components';
import { subwayLineIdOptions } from '@/common/constants';
import { type LostFoundFilters, LostFoundType } from '@/model';
import { FilterState } from '@/store';
=======
import React from 'react';

import { FilterState } from '@/store';
import { type LostFoundFilters, LostFoundType } from '@/model';
import { subwayLineIdOptions } from '@/common/constants';
import { ResetFilter, SearchFilter, DropdownFilter } from '@/common/components';
>>>>>>> main

const lostTypeOptions = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
};

<<<<<<< HEAD
interface LostFoundFilterListProps extends Omit<FilterState<LostFoundFilters>, 'loaded'> {}
=======
interface LostFoundFilterListProps
  extends Omit<FilterState<LostFoundFilters>, 'loaded'> {}
>>>>>>> main

export const LostFoundFilterList = ({
  filters,
  activatedCount,
  handleSelect,
  handleReset,
}: LostFoundFilterListProps) => {
  return (
    <section className=" flex flex-col gap-4 mt-8 px-5">
      <SearchFilter />
      <div className=" flex items-center gap-2">
<<<<<<< HEAD
        <ResetFilter activatedCount={activatedCount} handleReset={handleReset} />
=======
        <ResetFilter
          activatedCount={activatedCount}
          handleReset={handleReset}
        />
>>>>>>> main
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

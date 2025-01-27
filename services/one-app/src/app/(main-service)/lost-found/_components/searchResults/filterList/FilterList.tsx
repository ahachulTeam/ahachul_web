import { ResetFilter, SearchFilter, DropdownFilter } from '@/component';
import { subwayLineIdOptions } from '@/constant';
import { type LostFoundFilters, LostFoundType } from '@/model';
import { FilterState } from '@/store';

const lostTypeOptions = {
  [LostFoundType.LOST]: '분실물',
  [LostFoundType.ACQUIRE]: '습득물',
};

interface LostFoundFilterListProps extends Omit<FilterState<LostFoundFilters>, 'loaded'> {}

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
        <ResetFilter activatedCount={activatedCount} handleResetAction={handleReset} />
        <DropdownFilter
          name="lostType"
          filters={filters}
          options={lostTypeOptions}
          onSelectAction={handleSelect}
        />
        <DropdownFilter
          name="subwayLineId"
          filters={filters}
          options={subwayLineIdOptions}
          onSelectAction={handleSelect}
        />
      </div>
    </section>
  );
};

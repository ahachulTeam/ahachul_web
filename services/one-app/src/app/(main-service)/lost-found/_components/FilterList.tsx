import { ResetFilter, DropdownFilter } from '@/component';
import { subwayLineIdOptions } from '@/constant';
import { defaultLostFoundFilterValues, lostTypeOptions } from '@/constant/lost-found';
import { LostFoundType, SubwayLineFilterOptions } from '@/types';

type Props = {
  category?: LostFoundType;
  subwayLineId?: SubwayLineFilterOptions;
};

const Filters = ({
  category = LostFoundType.LOST,
  subwayLineId = SubwayLineFilterOptions.ALL_LINES,
}: Props) => {
  return (
    <section className=" flex items-center gap-2 px-5 mt-4">
      <ResetFilter options={defaultLostFoundFilterValues} />
      <DropdownFilter name="category" value={category} options={lostTypeOptions} />
      <DropdownFilter name="subwayLineId" value={subwayLineId} options={subwayLineIdOptions} />
    </section>
  );
};

export default Filters;

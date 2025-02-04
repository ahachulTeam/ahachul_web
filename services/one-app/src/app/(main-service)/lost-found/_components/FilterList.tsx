'use client';

import { useSearchParams } from 'next/navigation';

import { ResetFilter, DropdownFilter } from '@/component';
import { subwayLineIdOptions } from '@/constant';
import { defaultLostFoundFilterValues, lostTypeOptions } from '@/constant/lost-found';
import { LostFoundType, SubwayLineFilterOptions } from '@/types';

export default function Filters() {
  const searchParams = useSearchParams();
  const category = (searchParams.get('category') as LostFoundType) ?? LostFoundType.LOST;
  const subwayLineId =
    (searchParams.get('subwayLineId') as SubwayLineFilterOptions) ??
    SubwayLineFilterOptions.ALL_LINES;

  return (
    <section className=" flex items-center gap-2 px-5 mt-4">
      <ResetFilter options={defaultLostFoundFilterValues} />
      <DropdownFilter name="category" value={category} options={lostTypeOptions} />
      <DropdownFilter name="subwayLineId" value={subwayLineId} options={subwayLineIdOptions} />
    </section>
  );
}

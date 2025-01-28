'use client';

import { useSearchParams } from 'next/navigation';

import { ResetFilter, DropdownFilter } from '@/component';
import { subwayLineIdOptions } from '@/constant';
import { communityTypeOptions, defaultCommunityFilterValues } from '@/constant/community';
import { SubwayLineFilterOptions } from '@/types';
import { CommunityType } from '@/types/community';

const Filters = () => {
  const searchParams = useSearchParams();
  const category = (searchParams.get('category') as CommunityType) ?? CommunityType.HOT;
  const subwayLineId =
    (searchParams.get('subwayLineId') as SubwayLineFilterOptions) ??
    SubwayLineFilterOptions.ALL_LINES;

  return (
    <section className=" flex items-center gap-2 px-5 mt-4">
      <ResetFilter options={defaultCommunityFilterValues} />
      <DropdownFilter name="category" value={category} options={communityTypeOptions} />
      <DropdownFilter name="subwayLineId" value={subwayLineId} options={subwayLineIdOptions} />
    </section>
  );
};

export default Filters;

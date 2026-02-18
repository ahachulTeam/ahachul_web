'use client';

import { useSearchParams } from 'next/navigation';

import { DropdownFilter, ResetFilter } from '@/components';
import { defaultComplaintFilterValues } from '@/constants/complaint';
import { subwayLineIdOptions } from '@/constants/subway';
import { SubwayLineFilterOptions } from '@/types';

const Filters = () => {
  const searchParams = useSearchParams();
  const subwayLineId =
    (searchParams.get('subwayLineId') as SubwayLineFilterOptions) ??
    SubwayLineFilterOptions.ALL_LINES;

  return (
    <section className="mt-4 flex items-center gap-2 px-5">
      <ResetFilter options={defaultComplaintFilterValues} />
      <DropdownFilter name="subwayLineId" value={subwayLineId} options={subwayLineIdOptions} />
    </section>
  );
};

export default Filters;

import type { SubwayLineFilterOptions } from '@/types';

import { generateComplaintMetadata } from './_lib/metadata';

type Props = {
  searchParams: Promise<{
    q?: string;
    subwayLineId?: SubwayLineFilterOptions;
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  return generateComplaintMetadata(searchParams);
}

export default function ComplaintPage() {
  return <main className="flex min-h-screen flex-col text-black bg-white ">민원</main>;
}

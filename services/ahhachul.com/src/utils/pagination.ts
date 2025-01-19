import type { InfiniteApiResponse } from '@/types';

export const extractInfinitePageData = <TData>(
  infiniteResponse: InfiniteApiResponse<TData>,
): TData[] => {
  return infiniteResponse.pages.flatMap(page => page?.result?.data ?? []);
};

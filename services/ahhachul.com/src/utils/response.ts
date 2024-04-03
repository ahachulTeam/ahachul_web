import type { InfiniteData, UseSuspenseInfiniteQueryResult } from '@tanstack/react-query';
import { IResponse, ListResponse } from 'types';

export const flattenInfinityListData = <T extends {}>(
  data: InfiniteData<UseSuspenseInfiniteQueryResult<IResponse<ListResponse<T>>, Error>>,
): T[] => {
  return data.pages.map((page) => page?.data?.result?.posts ?? []).flat();
};

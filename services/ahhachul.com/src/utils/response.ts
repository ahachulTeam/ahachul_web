import type { InfiniteData } from '@tanstack/react-query';
import { ListResponse } from 'types';

export const flattenInfinityListData = <T extends {}>(data: InfiniteData<ListResponse<T>>): T[] => {
  return data.pages.map((page) => page?.posts ?? []).flat();
};

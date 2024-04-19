import type { InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IResponse, ListResponse } from 'types';

export const flattenInfinityListData = <T>(
  data: InfiniteData<AxiosResponse<IResponse<ListResponse<T>>>, unknown>,
): T[] => {
  return data.pages.map((page) => page?.data?.result?.posts ?? []).flat();
};

import type { InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IResponse, ResponseOfList } from 'entities/with-server';

export const flattenInfinityListData = <T>(
  data: InfiniteData<AxiosResponse<IResponse<ResponseOfList<T>>>, unknown>,
): T[] => {
  return data.pages.map((page) => page?.data?.result?.posts ?? []).flat();
};

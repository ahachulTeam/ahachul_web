import { AxiosResponse } from 'axios';
import type { InfiniteData } from '@tanstack/react-query';
import { IResponse, ResponseOfList } from 'entities/with-server';

export const flattenInfinityList = <TData>(
  data: InfiniteData<AxiosResponse<IResponse<ResponseOfList<TData>>>, unknown>,
): TData[] => {
  return data.pages.map((page) => page?.data?.result?.data ?? []).flat();
};

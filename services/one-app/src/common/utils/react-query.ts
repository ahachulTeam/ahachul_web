<<<<<<< HEAD
import type { InfiniteData } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
=======
import { AxiosResponse } from 'axios';
import type { InfiniteData } from '@tanstack/react-query';
>>>>>>> develop

import type { IResponse, ListResponseWithPagination } from '@/model';

export const generateQueryKey = (type: string[]) => {
  return {
    all: type,
    lists() {
      return [...this.all, 'list'] as const;
    },
    list(filters: Record<string, unknown>) {
      return [...this.lists(), filters] as const;
    },
    details() {
      return [...this.all, 'detail'] as const;
    },
    detail(id: number | string) {
      return [...this.details(), id] as const;
    },
    comments(id: number | string) {
      return [...this.detail(id), 'comments'] as const;
    },
  };
};

export const flattenInfinityList = <TData>(
<<<<<<< HEAD
  data: InfiniteData<AxiosResponse<IResponse<ListResponseWithPagination<TData>>>, unknown>,
): TData[] => {
  return data.pages.map(page => page?.data?.result?.data ?? []).flat();
=======
  data: InfiniteData<
    AxiosResponse<IResponse<ListResponseWithPagination<TData>>>,
    unknown
  >,
): TData[] => {
  return data.pages.map((page) => page?.data?.result?.data ?? []).flat();
>>>>>>> develop
};

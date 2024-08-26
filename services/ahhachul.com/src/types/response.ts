import type { QueryStatus } from '@tanstack/react-query';

export interface IQueryResponse<T> {
  status: QueryStatus;
  data: T;
  refetch?: () => void;
  isFetching?: boolean;
  error?: unknown;
}

export interface ListPageApiInfo {
  hasNext: boolean;
  nextPageNum?: number;
}

export type ListResponse<T> = {
  posts: T[];
} & ListPageApiInfo;

export type YNType = 'Y' | 'N';

export type RegionType = 'METROPOLITAN';

export type ImageType = {
  imageId: number;
  imageUrl: string;
};

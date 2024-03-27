import type { QueryStatus } from '@tanstack/react-query';

export interface IQueryResponse<T> {
  status: QueryStatus;
  data: T;
  refetch?: () => void;
  isFetching?: boolean;
  error?: unknown;
}

export interface IResponse<T> {
  /** 응답코드 */
  code: string;
  /** 응답메시지 */
  message: string;
  /** response data */
  result: T;
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

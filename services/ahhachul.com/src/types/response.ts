import { QueryStatus } from '@tanstack/react-query';

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
  payload: T;
}

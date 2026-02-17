export enum APIResponseCode {
  SUCCESS = '100',
  BAD_REQUEST = '101',
  INTERNAL_SERVER_ERROR = '102',
}

export interface ApiResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

export type IResponse<TResult> = ApiResponse<TResult>;

export interface CursorPagination {
  hasNext: boolean;
  pageToken?: string | null;
}

export interface PaginatedList<TData> extends CursorPagination {
  data: TData[];
}

export type WithPostId = {
  id: number;
};

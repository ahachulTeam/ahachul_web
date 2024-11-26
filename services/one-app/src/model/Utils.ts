export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

export interface CursorBasedPaginationParams {
  pageSize: number;
  pageToken?: string;
}

export interface CursorBasedPaginationResponse {
  hasNext: boolean;
  pageToken: string | null;
}

export interface ListResponseWithPagination<TData>
  extends CursorBasedPaginationResponse {
  data: TData[];
}

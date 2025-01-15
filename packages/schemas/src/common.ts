export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

export interface PageNavigationResponse {
  hasNext: boolean;
  pageToken?: number;
  nextPageNum?: number;
}

export interface ResponseOfList<TData> extends PageNavigationResponse {
  data: TData[];
}

export type PageSort =
  | 'likes,desc'
  | 'likes,asc'
  | 'createdAt,desc'
  | 'createdAt,asc'
  | 'views,desc'
  | 'views,asc';

export interface PageParams {
  page: number;
  size: number;
}

export interface CursorBasedPaginationParams {
  pageSize: number;
  pageToken?: number;
}

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type StringRecord = Record<string, string>;
export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;

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

export interface ListResponseWithPagination<TData> extends CursorBasedPaginationResponse {
  data: TData[];
}

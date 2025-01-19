export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type StringRecord = Record<string, string>;
<<<<<<< HEAD
export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<keyof T, symbol>}`;
=======
export type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`;
>>>>>>> develop

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

<<<<<<< HEAD
export interface ListResponseWithPagination<TData> extends CursorBasedPaginationResponse {
=======
export interface ListResponseWithPagination<TData>
  extends CursorBasedPaginationResponse {
>>>>>>> develop
  data: TData[];
}

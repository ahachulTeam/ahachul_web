export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;
export type Nullable<T> = T | null;

export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}

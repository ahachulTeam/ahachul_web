import { SORT_FILTER_TYPE } from "~/constants/filter";

export interface ResponseDto<T> {
  code: number;
  message: string;
  payload: T;
}

export type YesNoLiteralType = "Y" | "N";

export type Nullable<T> = T | null;

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;

export type SortFilterType = KeyOf<typeof SORT_FILTER_TYPE>;

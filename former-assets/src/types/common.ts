import { CommonResponseMessages, ErrorCode } from "@/constants";

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;

export type TagVariant = "primary" | "outline" | "ghost";

export interface StandardResponse<T> {
  code: ErrorCode;
  message: CommonResponseMessages;
  result: T;
}

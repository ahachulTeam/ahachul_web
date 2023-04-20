export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;

export type CommonErrorCodes = "100" | "101" | "102" | "103";
export type CommonResponseMessages =
  | "SUCCESS"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "유효하지 않은 도메인입니다.";

export interface StandardResponse<T> {
  code: CommonErrorCodes;
  message: CommonResponseMessages;
  result: T;
}

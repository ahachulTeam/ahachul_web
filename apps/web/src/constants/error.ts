import { HttpStatusCode } from "axios";

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>;

export type ErrorCode =
  | "100"
  | "101"
  | "102"
  | "103"
  | "200"
  | "201"
  | "202"
  | "203"
  | "204"
  | "205";

export type CommonResponseMessages =
  | "SUCCESS"
  | "BAD_REQUEST"
  | "INTERNAL_SERVER_ERROR"
  | "유효하지 않은 도메인입니다."
  | "유효하지 않은 ID 토큰입니다."
  | "유효기간이 만료된 엑세스 토큰입니다."
  | "유효하지 않은 리프레쉬 토큰입니다."
  | "유효기간이 만료된 리프레쉬 토큰입니다."
  | "유효하지 않은 권한 코드입니다."
  | "유효하지 않은 액세스 토큰입니다.";

export type ErrorCodeInfo = Partial<Record<ErrorCode, string>>;
export type APIErrorResponse = {
  code: ErrorCode;
  errors: string;
  message: string;
  status: HttpStatusCode;
  statusText: string;
};

// 임시 에러 코드
export const ERROR_MESSAGE: Partial<Record<HttpStatusCode, ErrorCodeInfo>> = {
  200: {
    "100": "SUCCESS",
  },
  400: {
    "101": "BAD_REQUEST",
    "102": "INTERNAL_SERVER_ERROR",
    "103": "유효하지 않은 도메인입니다.",
    "200": "유효하지 않은 ID 토큰입니다.",
  },
  401: {
    "201": "유효하지 않은 엑세스 토큰입니다.",
    "202": "유효기간이 만료된 엑세스 토큰입니다.",
    "203": "유효하지 않은 리프레쉬 토큰입니다.",
    "204": "유효기간이 만료된 리프레쉬 토큰입니다.",
    "205": "유효하지 않은 권한 코드입니다.",
  },
};

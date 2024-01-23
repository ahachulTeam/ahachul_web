import { HttpStatusCode } from "axios";
import { ValueOf } from "~/models/common";

export type ResponseStatus = {
  code: ValueOf<typeof ResponseCode>;
  message: ValueOf<typeof ResponseMessages>;
};

export enum ResponseCode {
  SUCCESS = "100",
  BAD_REQUEST = "101",
  SERVER_ERROR = "102",
  INVALID_DOMAIN = "103",
  INVALID_ID_TOKEN = "200",
  INVALID_ACCESS_TOKEN = "201",
  EXPIRED_ACCESS_TOKEN = "202",
  INVALID_REFRESH_TOKEN = "203",
  EXPIRED_REFRESH_TOKEN = "204",
  INVALID_AUTH_CODE = "205",
}

export enum ResponseMessages {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  INVALID_DOMAIN = "유효하지 않은 도메인입니다.",
  INVALID_ID_TOKEN = "유효하지 않은 ID 토큰입니다.",
  INVALID_ACCESS_TOKEN = "유효하지 않은 리프레쉬 토큰입니다.",
  EXPIRED_ACCESS_TOKEN = "유효기간이 만료된 엑세스 토큰입니다.",
  INVALID_REFRESH_TOKEN = "유효하지 않은 리프레쉬 토큰입니다.",
  EXPIRED_REFRESH_TOKEN = "유효기간이 만료된 리프레쉬 토큰입니다.",
  INVALID_AUTH_CODE = "유효하지 않은 권한 코드입니다.",
}

export type ErrorCodeInfo = Partial<
  Record<ValueOf<typeof ResponseCode>, string>
>;
export type APIErrorResponse = {
  code: ResponseCode;
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

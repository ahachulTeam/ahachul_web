import { HttpStatusCode } from 'axios';

export type ErrorCode =
  | '100'
  | '101'
  | '102'
  | '103'
  | '200'
  | '201'
  | '202'
  | '203'
  | '204'
  | '205';

export type ErrorResponseMessages =
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | '유효하지 않은 도메인입니다.'
  | '유효하지 않은 ID 토큰입니다.'
  | '유효기간이 만료된 엑세스 토큰입니다.'
  | '유효하지 않은 리프레쉬 토큰입니다.'
  | '유효기간이 만료된 리프레쉬 토큰입니다.'
  | '유효하지 않은 권한 코드입니다.'
  | '유효하지 않은 액세스 토큰입니다.';

export type ErrorCodeInfo = Partial<Record<ErrorCode, string>>;

export type APIErrorResponse = {
  code: ErrorCode;
  errors: string;
  message: string;
  status: HttpStatusCode;
  statusText: string;
};

export interface IResponse<T> {
  code: string;
  message: string;
  result: T;
}

export enum APIResponseCode {
  SUCCESS = '100',
  BAD_REQUEST = '101',
  INTERNAL_SERVER_ERROR = '102',
  INVALID_DOMAIN = '103',
  INVALID_ID_TOKEN = '200',
  INVALID_ACCESS_TOKEN = '201',
  EXPIRED_ACCESS_TOKEN = '202',
  INVALID_REFRESH_TOKEN = '203',
  EXPIRED_REFRESH_TOKEN = '204',
  INVALID_PERMISSION_CODE = '205',
}

export const RESPONSE_MESSAGES: Record<APIResponseCode, string> = {
  [APIResponseCode.SUCCESS]: 'SUCCESS',
  [APIResponseCode.BAD_REQUEST]: 'BAD REQUEST',
  [APIResponseCode.INTERNAL_SERVER_ERROR]: 'INTERNAL SERVER ERROR',
  [APIResponseCode.INVALID_DOMAIN]: '유효하지 않은 도메인입니다.',
  [APIResponseCode.INVALID_ID_TOKEN]: '유효하지 않은 ID 토큰입니다.',
  [APIResponseCode.INVALID_ACCESS_TOKEN]: '유효하지 않은 엑세스 토큰입니다.',
  [APIResponseCode.EXPIRED_ACCESS_TOKEN]:
    '유효기간이 만료된 엑세스 토큰입니다.',
  [APIResponseCode.INVALID_REFRESH_TOKEN]: '유효하지 않은 리프레쉬 토큰입니다.',
  [APIResponseCode.EXPIRED_REFRESH_TOKEN]:
    '유효기간이 만료된 리프레쉬 토큰입니다.',
  [APIResponseCode.INVALID_PERMISSION_CODE]: '유효하지 않은 권한 코드입니다.',
} as const;

export type ErrorCode = `${APIResponseCode}`;

export interface ErrorInfo {
  code: ErrorCode;
  message: string;
}

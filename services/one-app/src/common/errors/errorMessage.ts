import { ErrorResponseMessages } from './responseErrorType';

export const SERVER_ERROR_MESSAGES: Record<string, ErrorResponseMessages> = {
  b: 'BAD_REQUEST',
  c: 'INTERNAL_SERVER_ERROR',
  d: '유효하지 않은 도메인입니다.',
  e: '유효하지 않은 ID 토큰입니다.',
  f: '유효기간이 만료된 엑세스 토큰입니다.',
  g: '유효하지 않은 리프레쉬 토큰입니다.',
  h: '유효기간이 만료된 리프레쉬 토큰입니다.',
  i: '유효하지 않은 권한 코드입니다.',
  j: '유효하지 않은 액세스 토큰입니다.',
};

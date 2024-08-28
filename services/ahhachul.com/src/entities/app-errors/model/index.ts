import { type HttpStatusCode } from 'axios';

type ErrorCode =
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

type CommonResponseMessages =
  | 'SUCCESS'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | '유효하지 않은 도메인입니다.'
  | '유효하지 않은 ID 토큰입니다.'
  | '유효기간이 만료된 엑세스 토큰입니다.'
  | '유효하지 않은 리프레쉬 토큰입니다.'
  | '유효기간이 만료된 리프레쉬 토큰입니다.'
  | '유효하지 않은 권한 코드입니다.'
  | '유효하지 않은 엑세스 토큰입니다.';

type ErrorCodeInfo = Partial<Record<ErrorCode, CommonResponseMessages>>;

export { ErrorCodeInfo };

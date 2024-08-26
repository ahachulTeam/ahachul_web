import { type HttpStatusCode } from 'axios';
import { type ErrorCodeInfo } from 'features/app-errors';

export const ERROR_MESSAGES: Partial<Record<HttpStatusCode, ErrorCodeInfo>> = {
  200: {
    '100': 'SUCCESS',
  },
  400: {
    '101': 'BAD_REQUEST',
    '102': 'INTERNAL_SERVER_ERROR',
    '103': '유효하지 않은 도메인입니다.',
    '200': '유효하지 않은 ID 토큰입니다.',
  },
  401: {
    '201': '유효하지 않은 엑세스 토큰입니다.',
    '202': '유효기간이 만료된 엑세스 토큰입니다.',
    '203': '유효하지 않은 리프레쉬 토큰입니다.',
    '204': '유효기간이 만료된 리프레쉬 토큰입니다.',
    '205': '유효하지 않은 권한 코드입니다.',
  },
};

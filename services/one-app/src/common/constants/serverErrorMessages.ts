export const SERVER_ERROR_MESSAGES = {
  '101': 'BAD_REQUEST',
  '102': 'INTERNAL_SERVER_ERROR',
  '103': '유효하지 않은 도메인입니다.',
  '200': '유효하지 않은 ID 토큰입니다.',
  '201': '유효하지 않은 엑세스 토큰입니다.',
  '202': '유효기간이 만료된 엑세스 토큰입니다.',
  '203': '유효하지 않은 리프레쉬 토큰입니다.',
  '204': '유효기간이 만료된 리프레쉬 토큰입니다.',
  '205': '유효하지 않은 권한 코드입니다.',
} as const;

export type ErrorCode = keyof typeof SERVER_ERROR_MESSAGES;

export type ErrorMessages =
  (typeof SERVER_ERROR_MESSAGES)[keyof typeof SERVER_ERROR_MESSAGES];

export type ErrorInfo = {
  code: ErrorCode;
  message: ErrorMessages;
};

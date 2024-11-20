import { HttpResponse, http } from 'msw';
import {
  ErrorInfo,
  ErrorCode,
  APIResponseCode,
  RESPONSE_MESSAGES,
} from '@/common/constants/api';
import { createSuccessResponse } from '../mock-utils';

const createErrorResponse = (errorInfo: ErrorInfo): HttpResponse => {
  return HttpResponse.json(
    { ...errorInfo, result: null },
    { status: 400 }, // 모든 에러를 400으로 처리하되, 실제 에러 코드는 응답 본문에 포함
  );
};

const throwRandomError = () => {
  const errorCodes = Object.values(APIResponseCode) as ErrorCode[];
  const randomErrorCode =
    errorCodes[Math.floor(Math.random() * errorCodes.length)];

  if (randomErrorCode === APIResponseCode.SUCCESS)
    return createSuccessResponse({});

  return createErrorResponse({
    code: randomErrorCode,
    message: RESPONSE_MESSAGES[randomErrorCode],
  });
};

const exampleGetErrorHandler = http.get('/api/example-error', () => {
  return throwRandomError();
});

const examplePostErrorHandler = http.post('/api/example-error', () => {
  return throwRandomError();
});

export default [exampleGetErrorHandler, examplePostErrorHandler];

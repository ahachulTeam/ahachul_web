import axios from 'axios';

type ApiErrorPayload = {
  code?: unknown;
};

export const LOGIN_ERROR_MESSAGES = {
  invalid_callback_params: '로그인 요청 정보가 올바르지 않습니다. 다시 시도해주세요.',
  invalid_authorization_code: '로그인 코드가 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.',
  invalid_access_token: '소셜 인증이 만료되었습니다. 다시 로그인해주세요.',
  unknown: '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
} as const;

export type LoginErrorCode = keyof typeof LOGIN_ERROR_MESSAGES;

function isLoginErrorCode(value: unknown): value is LoginErrorCode {
  return typeof value === 'string' && value in LOGIN_ERROR_MESSAGES;
}

function extractApiErrorCode(error: unknown): string | null {
  if (!axios.isAxiosError(error)) {
    return null;
  }

  const code = (error.response?.data as ApiErrorPayload | undefined)?.code;
  if (typeof code !== 'string') {
    return null;
  }

  return code;
}

export function resolveLoginErrorCodeFromError(error: unknown): LoginErrorCode {
  const apiCode = extractApiErrorCode(error);

  switch (apiCode) {
    case '205':
      return 'invalid_authorization_code';
    case '206':
      return 'invalid_access_token';
    default:
      return 'unknown';
  }
}

export function parseLoginErrorCode(value: unknown): LoginErrorCode | null {
  if (!isLoginErrorCode(value)) {
    return null;
  }

  return value;
}

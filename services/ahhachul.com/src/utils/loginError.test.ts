import { describe, expect, it } from 'vitest';

import { parseLoginErrorCode, resolveLoginErrorCodeFromError } from './loginError';

describe('loginError', () => {
  it('OAuth 에러 코드 205/206을 사용자 노출 코드로 변환한다', () => {
    expect(
      resolveLoginErrorCodeFromError({
        isAxiosError: true,
        response: { data: { code: '205' } },
      }),
    ).toBe('invalid_authorization_code');

    expect(
      resolveLoginErrorCodeFromError({
        isAxiosError: true,
        response: { data: { code: '206' } },
      }),
    ).toBe('invalid_access_token');
  });

  it('비표준 에러는 unknown으로 처리한다', () => {
    expect(resolveLoginErrorCodeFromError(new Error('network'))).toBe('unknown');
    expect(resolveLoginErrorCodeFromError({})).toBe('unknown');
  });

  it('허용된 로그인 에러 코드만 파싱한다', () => {
    expect(parseLoginErrorCode('invalid_callback_params')).toBe('invalid_callback_params');
    expect(parseLoginErrorCode('invalid_access_token')).toBe('invalid_access_token');
    expect(parseLoginErrorCode('from_callback')).toBeNull();
  });
});

import { resolveClientErrorMessage, toOneAppClientError } from './observability';

describe('one-app observability', () => {
  it('서버 코드 기반 사용자 메시지를 우선 적용한다', () => {
    const message = resolveClientErrorMessage(
      {
        data: {
          code: '205',
          message: 'invalid oauth code',
        },
      },
      'fallback message',
    );

    expect(message).toBe('소셜 로그인 코드가 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
  });

  it('클라이언트 에러 객체에 정규화 메타데이터를 부여한다', () => {
    const error = toOneAppClientError(
      {
        message: 'Failed to fetch',
      },
      '네트워크 오류',
    );

    expect(error.userMessage).toBe('네트워크 오류');
    expect(error.normalizedError.isNetworkError).toBe(true);
    expect(error.code).toBeUndefined();
  });
});

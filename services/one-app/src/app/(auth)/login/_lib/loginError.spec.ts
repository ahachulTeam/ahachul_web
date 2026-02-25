import {
  LOGIN_ERROR_QUERY,
  parseLoginErrorQuery,
  resolveLoginErrorQueryFromError,
} from './loginError';

describe('loginError', () => {
  describe('resolveLoginErrorQueryFromError', () => {
    it('OAuth authorization code 오류를 식별한다', () => {
      expect(resolveLoginErrorQueryFromError({ data: { code: '205' } })).toBe(
        LOGIN_ERROR_QUERY.INVALID_AUTHORIZATION_CODE,
      );
    });

    it('OAuth access token 오류를 식별한다', () => {
      expect(resolveLoginErrorQueryFromError({ data: { code: '206' } })).toBe(
        LOGIN_ERROR_QUERY.INVALID_ACCESS_TOKEN,
      );
    });

    it('알 수 없는 오류는 unknown으로 처리한다', () => {
      expect(resolveLoginErrorQueryFromError({ data: { code: '500' } })).toBe(
        LOGIN_ERROR_QUERY.UNKNOWN,
      );
      expect(resolveLoginErrorQueryFromError(null)).toBe(LOGIN_ERROR_QUERY.UNKNOWN);
    });
  });

  describe('parseLoginErrorQuery', () => {
    it('허용된 query 값만 반환한다', () => {
      expect(parseLoginErrorQuery('invalid_access_token')).toBe(
        LOGIN_ERROR_QUERY.INVALID_ACCESS_TOKEN,
      );
      expect(parseLoginErrorQuery('invalid_callback_params')).toBe(
        LOGIN_ERROR_QUERY.INVALID_CALLBACK_PARAMS,
      );
    });

    it('허용되지 않은 query 값은 null 처리한다', () => {
      expect(parseLoginErrorQuery(undefined)).toBeNull();
      expect(parseLoginErrorQuery('from_callback')).toBeNull();
    });
  });
});

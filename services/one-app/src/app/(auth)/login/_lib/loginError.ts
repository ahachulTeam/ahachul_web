export const LOGIN_ERROR_QUERY = {
  INVALID_CALLBACK_PARAMS: 'invalid_callback_params',
  INVALID_AUTHORIZATION_CODE: 'invalid_authorization_code',
  INVALID_ACCESS_TOKEN: 'invalid_access_token',
  UNKNOWN: 'unknown',
} as const;

export type LoginErrorQuery = (typeof LOGIN_ERROR_QUERY)[keyof typeof LOGIN_ERROR_QUERY];

const LOGIN_ERROR_QUERY_SET = new Set<LoginErrorQuery>(Object.values(LOGIN_ERROR_QUERY));

type ErrorPayload = {
  code?: unknown;
};

type ErrorWithData = {
  data?: unknown;
};

function extractApiErrorCode(error: unknown): string | null {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const data = (error as ErrorWithData).data;
  if (!data || typeof data !== 'object') {
    return null;
  }

  const code = (data as ErrorPayload).code;
  if (typeof code !== 'string') {
    return null;
  }

  return code;
}

export function resolveLoginErrorQueryFromError(error: unknown): LoginErrorQuery {
  const code = extractApiErrorCode(error);

  switch (code) {
    case '205':
      return LOGIN_ERROR_QUERY.INVALID_AUTHORIZATION_CODE;
    case '206':
      return LOGIN_ERROR_QUERY.INVALID_ACCESS_TOKEN;
    default:
      return LOGIN_ERROR_QUERY.UNKNOWN;
  }
}

export function parseLoginErrorQuery(value: string | null | undefined): LoginErrorQuery | null {
  if (!value) {
    return null;
  }

  if (!LOGIN_ERROR_QUERY_SET.has(value as LoginErrorQuery)) {
    return null;
  }

  return value as LoginErrorQuery;
}

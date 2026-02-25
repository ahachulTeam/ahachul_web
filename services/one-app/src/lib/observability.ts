import {
  createAppLogger,
  normalizeAppError,
  type AppClientError,
  type AppLogLevel,
  type NormalizedAppError,
  SERVER_ERROR_MESSAGE_BY_CODE,
  toAppClientError,
} from '@ahhachul/domain';

const APP_NAME = '@ahhachul/one-app';

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? 'development';
const LOG_LEVEL = (process.env.NEXT_PUBLIC_LOG_LEVEL as AppLogLevel | undefined) ?? undefined;
const LOG_ENDPOINT = process.env.NEXT_PUBLIC_LOG_ENDPOINT;

const serverErrorMessageByCode: Record<string, string> = {
  ...SERVER_ERROR_MESSAGE_BY_CODE,
  '401': '로그인이 필요한 요청입니다. 다시 로그인해주세요.',
  '403': '접근 권한이 없습니다.',
};

export const appLogger = createAppLogger({
  app: APP_NAME,
  env: APP_ENV,
  minLevel: LOG_LEVEL,
  remoteEndpoint: LOG_ENDPOINT,
});

function toLogContext(context?: Record<string, unknown>) {
  return {
    appEnv: APP_ENV,
    ...context,
  };
}

export function normalizeClientError(
  error: unknown,
  fallbackUserMessage?: string,
): NormalizedAppError {
  return normalizeAppError(error, {
    fallbackUserMessage,
    errorMessageByCode: serverErrorMessageByCode,
  });
}

export function toOneAppClientError(error: unknown, fallbackUserMessage?: string): AppClientError {
  return toAppClientError(error, {
    fallbackUserMessage,
    errorMessageByCode: serverErrorMessageByCode,
  });
}

export function reportClientError(
  scope: string,
  error: unknown,
  context?: Record<string, unknown>,
  fallbackUserMessage?: string,
): NormalizedAppError {
  const normalizedError = normalizeClientError(error, fallbackUserMessage);
  appLogger.error(`[${scope}] request failed`, toLogContext(context), normalizedError);
  return normalizedError;
}

export function resolveClientErrorMessage(error: unknown, fallbackUserMessage: string): string {
  return normalizeClientError(error, fallbackUserMessage).userMessage;
}

import {
  createAppLogger,
  normalizeAppError,
  type AppClientError,
  type AppLogLevel,
  type AppLogger,
  type NormalizedAppError,
  SERVER_ERROR_MESSAGE_BY_CODE,
  toAppClientError,
} from '@ahhachul/domain';

const APP_NAME = '@ahhachul/app';

const APP_ENV = import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE ?? 'development';
const LOG_LEVEL = (import.meta.env.VITE_LOG_LEVEL as AppLogLevel | undefined) ?? undefined;
const LOG_ENDPOINT = import.meta.env.VITE_LOG_ENDPOINT;

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

type ActionLogContext = Record<string, unknown> | undefined;

export interface ActionLogger {
  start(action: string, context?: ActionLogContext): void;
  success(action: string, context?: ActionLogContext): void;
  info(action: string, context?: ActionLogContext): void;
  warn(action: string, context?: ActionLogContext): void;
  fail(
    action: string,
    error: unknown,
    context?: ActionLogContext,
    fallbackUserMessage?: string,
  ): NormalizedAppError;
  child(namespace: string): ActionLogger;
}

function emitScopedMessage(
  logger: AppLogger,
  level: 'debug' | 'info' | 'warn',
  scope: string,
  action: string,
  context?: ActionLogContext,
) {
  const message = `[${scope}] ${action}`;
  const payload = toLogContext(context);

  if (level === 'debug') {
    logger.debug(message, payload);
    return;
  }

  if (level === 'info') {
    logger.info(message, payload);
    return;
  }

  logger.warn(message, payload);
}

function createActionLoggerWithScope(scope: string, logger: AppLogger): ActionLogger {
  return {
    start: (action, context) =>
      emitScopedMessage(logger, 'debug', scope, `${action}:start`, context),
    success: (action, context) =>
      emitScopedMessage(logger, 'info', scope, `${action}:success`, context),
    info: (action, context) => emitScopedMessage(logger, 'info', scope, action, context),
    warn: (action, context) => emitScopedMessage(logger, 'warn', scope, action, context),
    fail: (action, error, context, fallbackUserMessage) => {
      const normalizedError = normalizeClientError(error, fallbackUserMessage);
      logger.error(`[${scope}:${action}] request failed`, toLogContext(context), normalizedError);
      return normalizedError;
    },
    child: namespace =>
      createActionLoggerWithScope(`${scope}:${namespace}`, logger.child(namespace)),
  };
}

export function createActionLogger(scope: string): ActionLogger {
  return createActionLoggerWithScope(scope, appLogger);
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

export function toViteClientError(error: unknown, fallbackUserMessage?: string): AppClientError {
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

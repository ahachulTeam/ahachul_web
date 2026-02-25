export const INTERNAL_SERVER_ERROR_MESSAGES = new Set([
  'INTERNAL_SERVER_ERROR',
  'INTERNAL SERVER ERROR',
]);

export const SERVER_ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  '101': '요청 값이 올바르지 않습니다. 입력 내용을 확인해주세요.',
  '102': '서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  '205': '소셜 로그인 코드가 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.',
  '206': '소셜 액세스 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
  '701': '현재 도착 예정 열차 정보가 없습니다.',
  '704': '실시간 열차 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  '802': '역 시간표 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
  '811': '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.',
};

type ApiErrorPayload = {
  code?: unknown;
  message?: unknown;
  traceId?: unknown;
};

type ErrorLike = {
  message?: unknown;
  status?: unknown;
  data?: unknown;
  code?: unknown;
  isAxiosError?: unknown;
  response?: {
    status?: unknown;
    data?: unknown;
  };
};

export interface NormalizedAppError {
  name: string;
  message: string;
  userMessage: string;
  code?: string;
  status?: number;
  traceId?: string;
  data?: unknown;
  isNetworkError: boolean;
  isAuthError: boolean;
  isClientError: boolean;
  isServerError: boolean;
  isRetryable: boolean;
}

interface NormalizeAppErrorOptions {
  fallbackUserMessage?: string;
  errorMessageByCode?: Record<string, string>;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  return value as Record<string, unknown>;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function toStringValue(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  return undefined;
}

function extractPayload(data: unknown): ApiErrorPayload | null {
  const record = asRecord(data);
  if (!record) {
    return null;
  }

  return {
    code: record.code,
    message: record.message,
    traceId: record.traceId,
  };
}

function isInternalServerMessage(message: string | undefined): boolean {
  if (!message) {
    return false;
  }

  return INTERNAL_SERVER_ERROR_MESSAGES.has(message.trim().toUpperCase());
}

export function resolveServerErrorMessage(
  code: string | undefined,
  serverMessage: string | undefined,
  fallbackUserMessage: string,
  mapByCode: Record<string, string> = SERVER_ERROR_MESSAGE_BY_CODE,
): string {
  if (code && mapByCode[code]) {
    return mapByCode[code];
  }

  if (serverMessage && !isInternalServerMessage(serverMessage)) {
    return serverMessage;
  }

  return fallbackUserMessage;
}

export function normalizeAppError(
  error: unknown,
  options: NormalizeAppErrorOptions = {},
): NormalizedAppError {
  const fallbackUserMessage =
    options.fallbackUserMessage ?? '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  const mapByCode = options.errorMessageByCode ?? SERVER_ERROR_MESSAGE_BY_CODE;

  const errorLike = (error ?? {}) as ErrorLike;
  const response = asRecord(errorLike.response);

  const status = toNumber(response?.status) ?? toNumber(errorLike.status);
  const data = response?.data ?? errorLike.data;

  const payload = extractPayload(data);
  const code = toStringValue(payload?.code);
  const traceId = toStringValue(payload?.traceId);

  const rawMessage =
    toStringValue(payload?.message) ??
    toStringValue(errorLike.message) ??
    (error instanceof Error ? error.message : 'Unknown error');

  const lowerMessage = rawMessage.toLowerCase();
  const transportCode = toStringValue(errorLike.code);
  const isNetworkError =
    status === undefined &&
    (lowerMessage.includes('network') ||
      lowerMessage.includes('failed to fetch') ||
      lowerMessage.includes('load failed') ||
      transportCode === 'ERR_NETWORK');

  const isAuthError = status === 401 || status === 403 || code === '205' || code === '206';
  const isClientError = status !== undefined && status >= 400 && status < 500;
  const isServerError = status !== undefined && status >= 500;
  const isRetryable =
    isNetworkError || status === 429 || isServerError || code === '704' || code === '802';

  return {
    name: error instanceof Error ? error.name : 'UnknownError',
    message: rawMessage,
    userMessage: resolveServerErrorMessage(
      code,
      toStringValue(payload?.message),
      fallbackUserMessage,
      mapByCode,
    ),
    code,
    status,
    traceId,
    data,
    isNetworkError,
    isAuthError,
    isClientError,
    isServerError,
    isRetryable,
  };
}

export type AppClientError = Error & {
  userMessage: string;
  code?: string;
  status?: number;
  data?: unknown;
  normalizedError: NormalizedAppError;
};

export function toAppClientError(
  error: unknown,
  options: NormalizeAppErrorOptions = {},
): AppClientError {
  const normalized = normalizeAppError(error, options);

  const baseError = error instanceof Error ? error : new Error(normalized.message);
  const appError = baseError as AppClientError;

  appError.userMessage = normalized.userMessage;
  appError.normalizedError = normalized;
  appError.code = normalized.code;
  appError.status = normalized.status;
  appError.data = normalized.data;

  if (!appError.message || isInternalServerMessage(appError.message)) {
    appError.message = normalized.userMessage;
  }

  return appError;
}

import { normalizeClientError } from '@/lib/observability';

type ApiErrorPayload = {
  code?: unknown;
  message?: unknown;
};

type HttpLikeError = Error & {
  data?: unknown;
};

const FILE_UPLOAD_FAILED_CODE = '811';
const INTERNAL_SERVER_ERROR_MESSAGE = 'INTERNAL_SERVER_ERROR';
const DEFAULT_FILE_UPLOAD_ERROR_MESSAGE =
  '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.';

function asApiErrorPayload(value: unknown): ApiErrorPayload | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  return value as ApiErrorPayload;
}

export function resolvePostSubmitErrorMessage(
  error: unknown,
  options: {
    fallbackMessage: string;
    fileUploadMessage?: string;
  },
): string {
  const normalized = normalizeClientError(error, options.fallbackMessage);
  const httpLikeError = (
    error instanceof Error ? error : new Error(normalized.message)
  ) as HttpLikeError;
  const payload = asApiErrorPayload(httpLikeError.data);
  const payloadCode = payload?.code;
  const payloadMessage = payload?.message;

  if (payloadCode === FILE_UPLOAD_FAILED_CODE) {
    return options.fileUploadMessage ?? DEFAULT_FILE_UPLOAD_ERROR_MESSAGE;
  }

  if (typeof payloadMessage === 'string' && payloadMessage !== INTERNAL_SERVER_ERROR_MESSAGE) {
    return payloadMessage;
  }

  if (
    normalized.userMessage &&
    normalized.userMessage !== INTERNAL_SERVER_ERROR_MESSAGE &&
    normalized.userMessage !== options.fallbackMessage
  ) {
    return normalized.userMessage;
  }

  if (httpLikeError.message && httpLikeError.message !== INTERNAL_SERVER_ERROR_MESSAGE) {
    return httpLikeError.message;
  }

  return options.fallbackMessage;
}

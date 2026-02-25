import axios from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'INTERNAL_SERVER_ERROR';
const FILE_UPLOAD_FAILED_CODE = '811';

type ApiErrorPayload = {
  code?: unknown;
  message?: unknown;
};

export function resolvePostSubmitWarningMessage(error: unknown, fallbackMessage: string): string {
  if (!axios.isAxiosError(error)) {
    return fallbackMessage;
  }

  const payload = error.response?.data as ApiErrorPayload | undefined;
  const code = payload?.code;
  const message = payload?.message;

  if (code === FILE_UPLOAD_FAILED_CODE) {
    return '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.';
  }

  if (typeof message === 'string' && message !== INTERNAL_SERVER_ERROR_MESSAGE) {
    return message;
  }

  return fallbackMessage;
}

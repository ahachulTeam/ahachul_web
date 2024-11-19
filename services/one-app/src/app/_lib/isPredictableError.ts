import { isRequestFailedError } from '@/common/errors/RequestError';
import { SERVER_ERROR_MESSAGES } from '@/common/constants/serverErrorMessages';

export const isPredictableError = (error: Error): boolean => {
  if (isRequestFailedError(error)) {
    return error.errorCode !== SERVER_ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  }
  return Object.keys(SERVER_ERROR_MESSAGES).includes(error.name);
};

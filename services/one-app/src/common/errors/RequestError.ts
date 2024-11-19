import { BaseError } from './BaseError';
import {
  type ErrorCode,
  SERVER_ERROR_MESSAGES,
} from '@/common/constants/serverErrorMessages';

export type RequestFailedErrorType = {
  requestBody?: any;
  status: number;
  endpoint: string;
  errorCode: ErrorCode;
  message: string;
  method: string;
};

export class RequestFailedError extends BaseError {
  requestBody?: any;
  status: number;
  endpoint: string;
  errorCode: ErrorCode;
  errorMessage: string;
  method: string;

  constructor({
    requestBody,
    status,
    endpoint,
    errorCode,
    message,
    method,
  }: RequestFailedErrorType) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.method = method;
    this.endpoint = endpoint;
    this.errorCode = errorCode;
    this.requestBody = requestBody;
    this.errorMessage =
      SERVER_ERROR_MESSAGES[message as keyof typeof SERVER_ERROR_MESSAGES] ||
      message;
  }
}

export function isRequestFailedError(
  error: unknown,
): error is RequestFailedError {
  return error instanceof RequestFailedError;
}

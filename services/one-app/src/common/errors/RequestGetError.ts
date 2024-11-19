import {
  RequestFailedError,
  type RequestFailedErrorType,
} from './RequestError';

type ErrorHandlingStrategy = 'toast' | 'fallback';

// GET 에러 발생 시 토스트로 에러를 표현할 지 errorBounadry의 fallback으로 에러를 표현할 지
export type WithErrorHandlingStrategy<P = unknown> = P & {
  errorHandlingStrategy?: ErrorHandlingStrategy;
};

export class RequestGetError extends RequestFailedError {
  errorHandlingStrategy: ErrorHandlingStrategy;

  constructor({
    errorHandlingStrategy = 'toast',
    ...rest
  }: WithErrorHandlingStrategy<RequestFailedErrorType>) {
    super(rest);

    this.errorHandlingStrategy = errorHandlingStrategy;
  }
}

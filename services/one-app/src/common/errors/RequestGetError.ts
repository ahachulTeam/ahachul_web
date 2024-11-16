import RequestError from './RequestError';
import { RequestErrorType } from './requestErrorType';

type ErrorHandlingStrategy = 'toast' | 'errorBoundary';

export type WithErrorHandlingStrategy<P = unknown> = P & {
  errorHandlingStrategy?: ErrorHandlingStrategy;
};

class RequestGetError extends RequestError {
  errorHandlingStrategy: string;

  constructor({
    errorHandlingStrategy = 'toast',
    ...rest
  }: WithErrorHandlingStrategy<RequestErrorType>) {
    super(rest);

    this.errorHandlingStrategy = errorHandlingStrategy;
  }
}

export { RequestGetError };

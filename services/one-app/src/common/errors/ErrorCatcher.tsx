import { useEffect } from 'react';

import { useAppErrorStore } from '@/store/appErrorStore';

import RequestError from './RequestError';
import { SERVER_ERROR_MESSAGES } from './errorMessage';

const isRequestError = (error: Error): error is RequestError => {
  return error instanceof RequestError;
};

const isPredictableError = (error: Error) => {
  if (isRequestError(error))
    if (error.errorCode === 'INTERNAL_SERVER_ERROR') return false;

  return SERVER_ERROR_MESSAGES[error.name] !== undefined;
};

const ErrorCatcher = ({ children }: React.PropsWithChildren) => {
  const { appError: error } = useAppErrorStore();

  useEffect(() => {
    if (!error) return;

    // captureError(error);

    if (!isRequestError(error) || !isPredictableError(error)) throw error;

    // toast.error(SERVER_ERROR_MESSAGES[error.errorCode], {
    //   showingTime: 3000,
    //   position: 'bottom',
    //   bottom: '8rem',
    // });
  }, [error]);

  return children;
};

export default ErrorCatcher;

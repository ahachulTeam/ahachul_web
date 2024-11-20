import { useEffect } from 'react';

import { useAppErrorStore } from '@/store/appErrorStore';
import { captureError } from '@/common/utils/error/captureError';
import { isRequestFailedError } from '@/common/errors/RequestError';
import { SERVER_ERROR_MESSAGES } from '@/common/constants/serverErrorMessages';

const isPredictableError = (error: Error): boolean => {
  if (isRequestFailedError(error)) {
    return error.errorCode !== '102';
  }
  return Object.keys(SERVER_ERROR_MESSAGES).includes(error.name);
};

/**
 * @description
 * 리액트 쿼리에서 의도적으로 throw한 에러를 처리합니다.
 * 1. 센트리로 에러를 전송합니다.
 * 2. 유저에게 토스트 UI를 통해 에러 상황을 전달합니다.
 * 3. 예측하지 못한 런타임 에러 등은 error.tsx로 전파합니다.
 */
export const ErrorCatcher = ({ children }: React.PropsWithChildren) => {
  const { appError: error } = useAppErrorStore();

  useEffect(() => {
    if (!error) return;

    captureError(error); // 센트리로 에러 전송

    if (!isRequestFailedError(error) || !isPredictableError(error)) throw error; // error.tsx로 전파

    // toast.error(SERVER_ERROR_MESSAGES[error.errorCode], {
    //   showingTime: 3000,
    //   position: 'bottom',
    //   bottom: '8rem',
    // });
  }, [error]);

  return children;
};

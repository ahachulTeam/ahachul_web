import { useEffect } from 'react';

import { isPredictableError } from '../_lib/isPredictableError';
import { useAppErrorStore } from '@/store/appErrorStore';
import { captureError } from '@/common/utils/error/captureError';
import { isRequestFailedError } from '@/common/errors/RequestError';

/**
 * @description
 * 리액트 쿼리에서 의도적으로 throw한 에러를 처리합니다.
 */
export const ErrorCatcher = ({ children }: React.PropsWithChildren) => {
  const { appError: error } = useAppErrorStore();

  useEffect(() => {
    if (!error) return;

    captureError(error); // 센트리로 에러 전달

    if (!isRequestFailedError(error) || !isPredictableError(error)) throw error; // error.tsx로 전파

    // toast.error(SERVER_ERROR_MESSAGES[error.errorCode], {
    //   showingTime: 3000,
    //   position: 'bottom',
    //   bottom: '8rem',
    // });
  }, [error]);

  return children;
};

'use client';

import { useEffect } from 'react';

import { useAppErrorStore } from '@/store/appErrorStore';
import { captureError } from '@/common/utils/error/captureError';
import { isRequestFailedError } from '@/common/errors/RequestError';
import { RESPONSE_MESSAGES } from '@/common/constants/api';

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

    // TODO: 토스트 컴포넌트 만들어서 alert 대체하기
    // toast.error(RESPONSE_MESSAGES[error.errorCode], {
    //   showingTime: 3000,
    //   position: 'bottom',
    //   bottom: '8rem',
    // });
    alert(RESPONSE_MESSAGES[error.errorCode]);
  }, [error]);

  return children;
};

const isPredictableError = (error: Error): boolean => {
  return Object.values(RESPONSE_MESSAGES).includes(error.message);
};

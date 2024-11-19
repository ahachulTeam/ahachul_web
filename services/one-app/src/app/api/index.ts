import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios';

import { AuthService } from '@/common/service/AuthService';
import { API_BASE_URL } from '@/common/constants/env';
import type { APIErrorResponse } from '@/common/constants/serverErrorMessages';
import { RequestGetError } from '@/common/errors/RequestGetError';
import { RequestFailedError } from '@/common/errors/RequestError';

// TODO, access_token 선택적으로 보내는 방안 모색 (axios type 확장)
// public한 함수(인기 검색 순위 등)들의 경우 굳이 access_token이 없음을 처리할 필요가 없음

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const requestConfig = config;

      // Access Token 설정
      const accessToken = AuthService.accessToken;
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      return requestConfig;
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err),
  );

  // TODO, 응답 에러 처리 다듬기
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (isAxiosError(error) && error.response?.data) {
        const { code } = error.response.data as APIErrorResponse;

        // console.log(code, error.response.data);

        if (code === '202') {
          // 액세스 토큰 만료 시 재요청
          return AuthService.resetTokenAndRetryRequest(error);
        }

        if (['201', '203', '204', '205'].includes(code)) {
          // 세션 만료 시 로그아웃 처리
          AuthService.expireSession();
          return Promise.reject(error);
        }
      }

      // console.error(error);
      // return Promise.reject(error);
      const customError = await createError(error);
      return Promise.reject(customError);
    },
  );

  return instance;
};

type ErrorInfo = {
  errorCode: string;
  message: string;
};

const createError = async (
  error: AxiosError,
): Promise<RequestFailedError | RequestGetError> => {
  if (!error.response) {
    throw error;
  }

  const { status, config, data } = error.response;
  const { errorCode, message } = data as ErrorInfo;

  if (config.method?.toUpperCase() === 'GET') {
    return new RequestGetError({
      status,
      requestBody: config.data,
      endpoint: config.url || '',
      name: errorCode,
      method: config.method,
      errorHandlingStrategy,
      message,
      errorCode,
    });
  }

  return new RequestFailedError({
    status,
    requestBody: config.data,
    endpoint: config.url || '',
    name: errorCode,
    method: config.method || '',
    message,
    errorCode,
  });
};

const apiClient = setInterceptor(
  axios.create({
    baseURL: API_BASE_URL,
  }),
);

export { apiClient };

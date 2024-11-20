import axios, { AxiosError, AxiosInstance } from 'axios';
import { AuthService } from '@/common/service/AuthService';
import { API_BASE_URL } from '@/common/constants/env';
import {
  APIResponseCode,
  type ErrorInfo,
  type ErrorCode,
} from '@/common/constants/api';
import {
  RequestGetError,
  WithErrorHandlingStrategy,
} from '@/common/errors/RequestGetError';
import { RequestFailedError } from '@/common/errors/RequestError';

// 에러 코드 상수 정의
const ERROR_CODES = {
  ACCESS_TOKEN_EXPIRED: APIResponseCode.EXPIRED_ACCESS_TOKEN,
  SESSION_EXPIRED: [
    APIResponseCode.INVALID_ACCESS_TOKEN,
    APIResponseCode.INVALID_REFRESH_TOKEN,
    APIResponseCode.EXPIRED_REFRESH_TOKEN,
    APIResponseCode.INVALID_PERMISSION_CODE,
  ],
} as const;

function isSessionExpiredCode(code: string): code is ErrorCode {
  return (ERROR_CODES.SESSION_EXPIRED as readonly string[]).includes(code);
}

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const requestConfig = config;
      const accessToken = AuthService.accessToken;
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return requestConfig;
    },
    async (error: AxiosError) => {
      const customError = await createError({ error });
      return Promise.reject(customError);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.data) {
        const { code } = error.response.data as ErrorInfo;

        if (code === ERROR_CODES.ACCESS_TOKEN_EXPIRED) {
          return AuthService.resetTokenAndRetryRequest(error);
        }

        if (isSessionExpiredCode(code)) {
          AuthService.expireSession();
          return Promise.resolve({ sessionExpired: true });
        }
      }

      const customError = await createError({ error: error as AxiosError });
      return Promise.reject(customError);
    },
  );

  return instance;
};

type CreateError = {
  error: AxiosError;
};

const createError = async ({
  error,
  errorHandlingStrategy,
}: WithErrorHandlingStrategy<CreateError>): Promise<
  RequestFailedError | RequestGetError
> => {
  if (!error.response) {
    throw error;
  }

  const { status, config, data } = error.response;
  const { code, message } = data as ErrorInfo;

  const errorParams = {
    status,
    requestBody: config.data,
    endpoint: config.url || '',
    method: config.method || '',
    errorHandlingStrategy,
    message,
    errorCode: code,
  };

  return config.method?.toUpperCase() === 'GET'
    ? new RequestGetError(errorParams)
    : new RequestFailedError(errorParams);
};

const apiClient = setInterceptor(
  axios.create({
    baseURL: API_BASE_URL,
  }),
);

export { apiClient };

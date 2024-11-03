import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios';
import { API_BASE_URL } from '@/constants/env';
import { TokenService } from './util/TokenService';
import { APIErrorResponse } from '@/type';

// TODO, access_token 선택적으로 보내기
const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const requestConfig = config;

      // Access Token 설정
      const accessToken = TokenService.accessToken;
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      return requestConfig;
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (isAxiosError(error) && error.response?.data) {
        const { code, status } = error.response.data as APIErrorResponse;

        // console.log(code, error.response.data);

        if (status === 401) {
          // 액세스 토큰 만료 시 재요청
          return TokenService.resetTokenAndRetryRequest(error);
        }

        if (['201', '202', '203', '204', '205'].includes(code)) {
          // 세션 만료 시 로그아웃 처리
          TokenService.expireSession();
          return Promise.reject(error);
        }
      }

      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const apiClient = setInterceptor(
  axios.create({
    baseURL: API_BASE_URL,
  }),
);

export { apiClient };

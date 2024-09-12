import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios';
import { API_BASE_URL } from '@/src/data/api';

import { auth } from '@/src/providers/AuthProvider';
import { Tokens } from '../utils/authentication/tokens';
import { APIErrorResponse } from '../types/error';
import { ERROR_MESSAGE } from '../data/error';

export const tokenService = new Tokens(auth);

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const requestConfig = config;

      let accessToken = auth.accessToken;
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (Tokens.isServer() && tokenService.context?.req?.cookies) {
        accessToken = '';
        if (tokenService.context.req.cookies[tokenService.cookieKey]) {
          accessToken = JSON.parse(
            tokenService.context.req.cookies[tokenService.cookieKey]!,
          ).accessToken;

          requestConfig.headers.Cookie = `${tokenService.cookieKey}={${encodeURIComponent(
            tokenService.context.req.cookies[tokenService.cookieKey]!.slice(
              1,
              -1,
            ),
          )}}`;
        }

        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (isAxiosError(error)) {
        if (error.response && error.response.data) {
          const { code, status } = error.response.data as APIErrorResponse;
          console.log(code, error.response.data);

          const toastMessage = ERROR_MESSAGE[status]?.[code];
          console.warn(status, code, toastMessage);

          if (
            code === '201' ||
            code === '203' ||
            code === '204' ||
            code === '205'
          ) {
            // 다시 로그인
            tokenService.expireSession();
            return Promise.reject(error);
          }

          if (code === '202') {
            // 액세스 토큰 만료
            return tokenService.resetTokenAndReAttemptRequest(error);
          }
          return Promise.reject(error);
        }
      }

      console.error(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const base = setInterceptor(
  axios.create({
    baseURL: API_BASE_URL,
  }),
);

export { base };

export * as AuthApi from './auth';
export * as LostApi from './lost';
export * as MemberApi from './member';
export * as SubwayApi from './subway-line';
export * as CommunityApi from './community';
export * as ComplaintsApi from './complaints';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults, isAxiosError } from "axios";

import { TokenService } from "@/utils/tokenService";

import { APIErrorResponse, ERROR_MESSAGE } from "@/constants/error";

import { auth } from "@/context";

export const tokenService = new TokenService(auth);
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      const requestConfig = config;

      let { accessToken } = auth;
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (TokenService.isServer() && tokenService.context?.req?.cookies) {
        accessToken = "";
        if (tokenService.context.req.cookies[tokenService.cookieKey]) {
          accessToken = JSON.parse(
            tokenService.context.req.cookies[tokenService.cookieKey]!
          ).accessToken;

          requestConfig.headers.Cookie = `${tokenService.cookieKey}={${encodeURIComponent(
            tokenService.context.req.cookies[tokenService.cookieKey]!.slice(1, -1)
          )}}`;
        }

        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err)
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (isAxiosError(error)) {
        if (error.response && error.response.data) {
          const { status, code, message: _message } = error.response.data as APIErrorResponse;
          console.log(code, error.response.data);

          const toastMessage = ERROR_MESSAGE[status]?.[code];
          console.warn(status, code, toastMessage);

          if (code === "201" || code === "203" || code === "204" || code === "205") {
            // 다시 로그인
            tokenService.expireSession();
            return Promise.reject(error);
          }

          if (code === "202") {
            // 액세스 토큰 만료
            return tokenService.resetTokenAndReAttemptRequest(error);
          }
          return Promise.reject(error);
        }
      }

      console.error(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

const options: CreateAxiosDefaults = {
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 3000,
  baseURL: BASE_URL,
};

export const ax = axios.create({
  ...options,
});

setInterceptor(ax);

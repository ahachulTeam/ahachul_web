import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from 'axios';

import { auth } from '@/contexts';
import { TokenService } from '@/utils';

import { BASE_URL } from './baseUrl';

const tokenService = new TokenService(auth);

const instance = axios.create({
  baseURL: BASE_URL.SV,
});

const createInstance = () => {
  return setInterceptors(instance);
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
  return instance;
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
};

const onRequestError = (err: AxiosError) => {
  return Promise.reject(err);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onResponseError = async (err: AxiosError<any>): Promise<unknown> => {
  const { response: errorResponse } = err;

  if (errorResponse?.data.message === 'INVALID_ACCESS_TOKEN') {
    return tokenService.resetTokenAndReattemptRequest(err);
  }

  if (errorResponse?.data.message === 'DUPLICATE_SIGNIN_DETECTED') {
    return tokenService.expireSession(errorResponse?.data.message);
  }

  return Promise.reject(err);
};

export const ax = createInstance();

export default ax;

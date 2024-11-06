import axios, { AxiosError, AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api.dev.ahhachul.com/v1';

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => config,
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err),
  );

  // TODO, 응답 에러 처리 다듬기
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
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

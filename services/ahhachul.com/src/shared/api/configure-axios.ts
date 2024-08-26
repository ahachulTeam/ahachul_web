import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {};
const baseURL = process.env.APP_ENV === 'test' ? 'http://localhost:3000' : process.env.PUBLIC_BASE_URL;
config.baseURL = baseURL;

const axiosInstance = axios.create(config);
const axiosRoutes = {
  auth: '/auth',
  users: '/users',
  'blind-date': '/blind-date',
} as const;

export { baseURL, axiosInstance, axiosRoutes };

import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {};
const baseURL = process.env.APP_ENV === 'test' ? 'http://localhost:3000' : process.env.REACT_APP_BASE_URL;
config.baseURL = baseURL;

const base = axios.create(config);
const routes = {
  auth: '/auth',
  users: '/users',
  community: '/community',
  'blind-date': '/blind-date',
} as const;

export { baseURL, base, routes };

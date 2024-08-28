import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {};
const baseURL =
  process.env.REACT_APP_ENV === 'test'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_BASE_URL;
config.baseURL = baseURL;

const base = axios.create(config);
const routes = {
  auth: '/auth',
  users: '/users',
  community: '/community',
  'blind-date': '/blind-date',
  'subway-lines': '/subway-lines',
  'subway-trains': '/trains/real-times',
  'subway-trains-congestion': '/trains/real-times/congestion',
} as const;

export { baseURL, base, routes };

import axios, { AxiosRequestConfig } from 'axios';
import { TIMESTAMP } from 'shared/lib/config/timestamp';

const config: AxiosRequestConfig = {
  timeout: 5 * TIMESTAMP.SECOND,
};
const baseURL =
  process.env.REACT_APP_MOCKING === 'true'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_BASE_URL;
config.baseURL = baseURL;

const base = axios.create(config);
const routes = {
  auth: '/auth',
  users: '/members',
  community: '/community-posts',
  complaints: '/complaints/messages',
  'community-comments': '/community-comments',
  'lost-found': '/lost-posts',
  'blind-date': '/blind-date',
  'subway-lines': '/subway-lines',
  'subway-trains': '/trains/real-times',
  'subway-trains-congestion': '/trains/real-times/congestion',
} as const;

export { baseURL, base, routes };

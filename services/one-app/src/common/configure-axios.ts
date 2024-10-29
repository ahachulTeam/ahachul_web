import axios, { AxiosRequestConfig } from 'axios';
import { isMocking } from '@/envs';

const config: AxiosRequestConfig = {};
const baseURL = isMocking()
  ? 'http://localhost:9090/v1'
  : process.env.NEXT_PUBLIC_BASE_URL;
config.baseURL = baseURL;

const API_BASE = axios.create(config);
enum API_ROUTES {
  AUTH = '/auth',
  MEMBER = '/members',
  COMMUNITY = '/community-posts',
}

export { API_BASE, API_ROUTES };

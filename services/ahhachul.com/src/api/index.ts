import axios from 'axios';
import { API_BASE_URL } from 'data/api';

const base = axios.create({
  baseURL: API_BASE_URL,
});

export { base };

export * as AuthApi from './auth';
export * as LostApi from './lost';
export * as MemberApi from './member';
export * as CommunityApi from './community';

import axios from 'axios';

const base = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export { base };

export * as AuthApi from './auth';
export * as MemberApi from './member';

import { AppEnv } from '@/types';

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || AppEnv.DEV;
export const IS_DEV_ENV = APP_ENV === AppEnv.DEV;

export const SITE_URL = (() => {
  if (IS_DEV_ENV) return 'http://localhost:3000';
  if (APP_ENV === AppEnv.DEV) return process.env.APP_DEV_URL;
  return process.env.APP_PRODUCTION_URL;
})();

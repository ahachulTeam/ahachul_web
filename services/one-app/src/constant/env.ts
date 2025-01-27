export enum AppEnv {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEV = 'development',
}

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || AppEnv.DEV;
export const IS_DEV_ENV = APP_ENV === AppEnv.DEV;

export const SITE_URL = (() => {
  if (IS_DEV_ENV) return 'http://localhost:3000';
  if (APP_ENV === AppEnv.DEV) return process.env.APP_DEV_URL;
  return process.env.APP_PRODUCTION_URL;
})();

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? 'http://localhost:9090'
    : IS_DEV_ENV
      ? 'https://api.dev.ahhachul.com/v1'
      : 'https://api.ahhachul.com/v1';

export const IS_SERVER = typeof window === 'undefined';

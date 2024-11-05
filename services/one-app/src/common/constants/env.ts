export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export enum AppEnv {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEV = 'development',
}

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'development';
export const IS_DEV_ENV = APP_ENV === AppEnv.DEV;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? 'http://localhost:9090'
    : IS_DEV_ENV
      ? 'https://api.dev.ahhachul.com/v1'
      : 'https://api.ahhachul.com/v1';

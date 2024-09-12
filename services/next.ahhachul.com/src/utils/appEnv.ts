import { ValueOf } from '../types';

export const APP_ENVS = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DEV: 'development',
} as const;

export type AppEnv = ValueOf<typeof APP_ENVS>;

export const APP_USER_AGENT = 'ahhachul.today.app';
export const ANDROID = 'android|Android';
export const IOS = 'iPhone|iPad|iPod';

const getUserAgent = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.navigator.userAgent;
};

export const isWebView = () => RegExp(APP_USER_AGENT).test(getUserAgent());
export const isAndroid = () => RegExp(ANDROID).test(getUserAgent());
export const isIOS = () => RegExp(IOS).test(getUserAgent());

export const isProd = () => process.env.NODE_ENV === 'production';

export const getAppEnv = (): AppEnv =>
  (process.env.NEXT_PUBLIC_APP_ENV as Exclude<AppEnv, 'development'>) ||
  'development';

export const getDomainName = () => {
  switch (getAppEnv()) {
    case 'production':
      return process.env.APP_PRODUCTION_URL;
    case 'staging':
      return process.env.APP_STAGING_URL;
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};

export const getKakaoApiKey = () => process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const getGoogleApiKey = () =>
  process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY;
export const getGoogleScope = () => process.env.NEXT_PUBLIC_GOOGLE_SCOPE;

export const isHistoryExist = (storage: Storage) => {
  return Boolean(
    storage.getItem('prevPath') &&
      typeof storage.getItem('prevPath') === 'string',
  );
};

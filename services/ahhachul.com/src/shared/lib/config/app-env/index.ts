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
  return window.navigator.userAgent;
};

export const isWebView = () => RegExp(APP_USER_AGENT).test(getUserAgent());
export const isAndroid = () => RegExp(ANDROID).test(getUserAgent());
export const isIOS = () => RegExp(IOS).test(getUserAgent());

export const isProd = () => process.env.NODE_ENV === 'production';
export const isDev = () => process.env.NODE_ENV === 'development';

export const getAppEnv = (): AppEnv =>
  (process.env.REACT_APP_ENV as Exclude<AppEnv, 'development'>) ||
  'development';

export const getDomainName = () => {
  switch (getAppEnv()) {
    case 'production':
      return process.env.REACT_APP_PRODUCTION_URL;
    case 'staging':
      return process.env.REACT_APP_STAGING_URL;
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};

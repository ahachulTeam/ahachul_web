//@ts-ignore
import { AppEnv } from '@/src/types/AppEnv';

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
  (process.env.NEXT_PUBLIC_APP_ENV as Exclude<AppEnv, 'development'>) || 'development';

export const getApiEndpoint = () => {
  switch (getAppEnv()) {
    case 'production':
    case 'staging':
    case 'development':
    default:
      return '';
  }
};

export const getDomainName = () => {
  switch (getAppEnv()) {
    case 'production':
      return 'https://ahhachul.com';
    case 'staging':
      return 'https://next-ahhachul-com.vercel.app';
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};

export const getKakaoApiKey = () => process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const getGoogleApiKey = () => process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY;
export const getGoogleScope = () => process.env.NEXT_PUBLIC_GOOGLE_SCOPE;

export const isHistoryExist = (storage: Storage) => {
  return Boolean(storage.getItem('prevPath') && typeof storage.getItem('prevPath') === 'string');
};

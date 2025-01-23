import { getUserAgent } from '@/utils';

export const IOS = 'iPhone|iPad|iPod';
export const ANDROID = 'android|Android';
export const APP_AGENT = 'ahhachul.today.app';

export const isIOS = () => RegExp(IOS).test(getUserAgent());
export const isAndroid = () => RegExp(ANDROID).test(getUserAgent());
export const isWebView = () => RegExp(APP_AGENT).test(getUserAgent());

export const WEB_URL_MAP = {
  production: import.meta.env.VITE_WEB_PRODUCTION_URL,
  staging: import.meta.env.VITE_WEB_STAGING_URL,
} as const;

export const WEB_SERVICE_URL =
  WEB_URL_MAP[import.meta.env.VITE_APP_ENV === 'production' ? 'production' : 'staging'];

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

export const getDomainUrl = () => (isProd() ? process.env.REACT_APP_URL : 'http://localhost:3000');

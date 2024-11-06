export enum SocialSignInType {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
}

export enum QueryStatus {
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export interface SocialLoginOption {
  social: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}

export interface APIRedirectUrlResponse {
  redirectUrl: string;
}

export enum CookieKey {
  ACCESS_TOKEN = 'AHAHCHUL_ACCESS_TOKEN',
  REFRESH_TOKEN = 'AHAHCHUL_REFRESH_TOKEN',
}

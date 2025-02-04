export enum SocialSignInType {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
}

export interface SocialLoginOption {
  social: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}

export enum CookieKey {
  ACCESS_TOKEN = 'AHAHCHUL_ACCESS_TOKEN',
  REFRESH_TOKEN = 'AHAHCHUL_REFRESH_TOKEN',
}

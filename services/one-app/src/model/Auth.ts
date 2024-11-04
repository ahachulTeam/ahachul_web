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
  name: string;
  icon: React.ElementType;
  bgColor: string;
  providerType: SocialSignInType;
}

export interface APIRedirectUrlResponse {
  redirectUrl: string;
}

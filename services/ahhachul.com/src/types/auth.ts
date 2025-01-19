export type AuthLevel = 'super' | 'admin' | 'branch';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type IAuthStore = {
  level: AuthLevel;
} & AuthTokens;

export enum SocialSignInType {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
}

export interface RedirectUrl {
  redirectUrl: string;
}

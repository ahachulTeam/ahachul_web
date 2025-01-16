export enum SocialSignInType {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
  GOOGLE = 'GOOGLE',
}

export interface APIRedirectUrlResponse {
  redirectUrl: string;
}

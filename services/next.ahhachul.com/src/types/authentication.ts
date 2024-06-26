export interface IAuthStore {
  auth: IToken | null;
}

export const MEMBER_STATUS = ['PENDING', 'ACTIVATED', 'DORMANT', 'WITHDRAWN'] as const;

export type MemberStatusType = (typeof MEMBER_STATUS)[number];

export type SocialSignInType = 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE';

export interface IToken {
  /** 액세스 토큰 */
  accessToken: string;
  /** 리프레시 토큰 */
  refreshToken: string;
  /** 액세스 토큰 만료 시간 */
  accessTokenExpiresIn: number;
  /** 리프레시 토큰 만료 시간 */
  refreshTokenExpiresIn: number;
}

export interface ISocialSignInParams {
  providerCode: string;
  providerType: SocialSignInType;
}

export interface ITermsAgreement {
  PRIVACY_CONSENT: boolean;
}

export interface IRefreshTokenParams {
  refreshToken: IToken['refreshToken'];
}

export interface ISocialSignInResponse extends IToken {
  memberId: number;
  isNeedAdditionalUserInfo: boolean;
}

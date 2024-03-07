export interface IAuthStore {
  auth: SingupResponseType | null;
}

export const MEMBER_STATUS = ['PENDING', 'ACTIVATED', 'DORMANT', 'WITHDRAWN'] as const;

export type MemberStatusType = (typeof MEMBER_STATUS)[number];

export type MembeIdBase = { memberId: number };

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
  identity: string;
  nonce?: string;
  provider: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'BODYCODI';
}

export interface ITermsAgreement {
  PRIVACY_CONSENT: boolean;
}

export interface ISignUpParams extends MembeIdBase {
  nickname: string;
  profileImageUrl: string;
  termsAgreement: ITermsAgreement;
}

export interface IRefreshTokenParams extends MembeIdBase {
  refreshToken: string;
}

export interface IAuthResponseBase extends MembeIdBase {
  token: IToken;
}

export interface ISocialSignInResponse extends IAuthResponseBase {
  memberStatus: MemberStatusType;
  isRequiredSignUp: boolean;
}

export type SingupResponseType = Omit<ISocialSignInResponse, 'isRequiredSignUp'>;
export type RefreshTokenResponseType = Omit<SingupResponseType, 'memberStatus'>;

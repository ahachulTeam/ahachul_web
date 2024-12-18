export const MEMBER_STATUS = [
  'PENDING',
  'ACTIVATED',
  'DORMANT',
  'WITHDRAWN',
] as const;

export type MemberStatusType = (typeof MEMBER_STATUS)[number];

export type ISocialSignInType = 'KAKAO' | 'GOOGLE' | 'APPLE';

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

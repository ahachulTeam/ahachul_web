export interface APILoginUserProviders {
  providerType: 'KAKAO' | 'GOOGLE'
  providerCode: string
}

export interface OAuthRedirectServerModel {
  redirectUrl: string
}

export interface APILoginUser {
  memberId: string
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: string
  isNeedAdditionalUserInfo: boolean
}

export type RenewAccessToken = Omit<APILoginUser, 'isNeedAdditionalUserInfo'>

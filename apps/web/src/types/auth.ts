export interface APILoginUserProviders {
  providerType: 'KAKAO' | 'GOOGLE'
  providerCode: string
}

export interface APILoginUser {
  memberId: string
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: string
  isNeedAdditionalUserInfo: boolean
}

import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ResponseCode } from '@/constants'

import { auth } from '@/context'
import { TokenService } from '@/utils/tokenService'

export const tokenService = new TokenService(auth)

export const globalQueryErrorHandler = (err: unknown, queryClient: QueryClient) => {
  if (err instanceof AxiosError) {
    const code = err.response?.data?.code

    const expireSessionCases = [
      ResponseCode.INVALID_ID_TOKEN,
      ResponseCode.INVALID_REFRESH_TOKEN,
      ResponseCode.EXPIRED_REFRESH_TOKEN,
      ResponseCode.INVALID_AUTH_CODE,
    ]

    if (expireSessionCases.includes(code)) {
      tokenService.expireSession()
      queryClient.invalidateQueries(['user', 'me'])
    }

    if (code === ResponseCode.EXPIRED_ACCESS_TOKEN) {
      // 액세스 토큰 만료
      return tokenService.resetTokenAndReAttemptRequest(err)
    }
  }
}

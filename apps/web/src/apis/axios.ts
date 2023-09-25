import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults, isAxiosError } from 'axios'

import { APIErrorResponse, ERROR_MESSAGE, ResponseCode } from '@/constants/error'
import { auth } from '@/context'
import * as O from '@/utils/option'
import { TokenService } from '@/utils/tokenService'

export const tokenService = new TokenService(auth)
export const BASE_URL = 'http://13.209.145.241:8080/v1'

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    config => {
      const requestConfig = config

      let { accessToken } = auth
      if (accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`
      }

      if (TokenService.isServer() && tokenService.context?.req?.cookies) {
        const optionCookie = O.fromUndefined(tokenService.context.req.cookies[tokenService.cookieKey])

        accessToken = O.mapOrElse(optionCookie, cookie => JSON.parse(cookie).accessToken, '')
        requestConfig.headers.Cookie = O.mapOrElse(
          optionCookie,
          cookie => `${tokenService.cookieKey}={${encodeURIComponent(cookie.slice(1, -1))}}`,
          ''
        )

        requestConfig.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (err: AxiosError): Promise<AxiosError> => Promise.reject(err)
  )

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (isAxiosError(error)) {
        if (error.response && error.response.data) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { status, code, message: _message } = error.response.data as APIErrorResponse
          console.log(code, error.response.data)

          const toastMessage = ERROR_MESSAGE[status]?.[code]
          console.warn(status, code, toastMessage)

          const expireSessionCases = [
            ResponseCode.INVALID_ID_TOKEN,
            ResponseCode.INVALID_REFRESH_TOKEN,
            ResponseCode.EXPIRED_REFRESH_TOKEN,
            ResponseCode.INVALID_AUTH_CODE,
          ]

          if (expireSessionCases.includes(code)) {
            // 다시 로그인
            tokenService.expireSession()
            return Promise.reject(error)
          }

          if (code === ResponseCode.EXPIRED_ACCESS_TOKEN) {
            // 액세스 토큰 만료
            return tokenService.resetTokenAndReAttemptRequest(error)
          }
          return Promise.reject(error)
        }
      }

      console.error(error)
      return Promise.reject(error)
    }
  )

  return instance
}

const options: CreateAxiosDefaults = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
}

export const ax = axios.create({
  ...options,
})

setInterceptor(ax)

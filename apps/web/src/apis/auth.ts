import axios from 'axios'
import { BASE_URL, ax } from './axios'
import * as type from '@/types/auth'
import { StandardResponse } from '@/types/global'

export const login = async (providers: type.APILoginUserProviders) => {
  const res = await ax.post<StandardResponse<type.APILoginUser>>('/auth/login', providers)
  return res.data
}

export const renewAccessToken = async (refreshToken: string) => {
  const res = await axios.post<StandardResponse<type.RenewAccessToken>>(`${BASE_URL}/auth/token/refresh`, {
    refreshToken,
  })

  return res.data
}

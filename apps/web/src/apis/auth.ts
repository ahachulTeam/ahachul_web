import axios from 'axios'
import { BASE_URL, ax } from './axios'
import { APILoginUser, APILoginUserProviders, RenewAccessToken } from '@/types/auth'
import { StandardResponse } from '@/types/common'

export const login = async (providers: APILoginUserProviders): Promise<StandardResponse<APILoginUser>> => {
  const res = await ax.post('/auth/login', providers)
  return res.data
}

export const renewAccessToken = async (refreshToken: string): Promise<StandardResponse<RenewAccessToken>> => {
  const res = await axios.post(`${BASE_URL}/auth/token/refresh`, {
    refreshToken,
  })

  return res.data
}

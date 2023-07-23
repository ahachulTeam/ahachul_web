import axios from 'axios'

import { APILoginUser } from '@/types/auth'
import { StandardResponse } from '@/types/common'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type RenewAccessToken = Omit<APILoginUser, 'isNeedAdditionalUserInfo'>

export const renewAccessToken = async (refreshToken: string): Promise<StandardResponse<RenewAccessToken>> => {
  const res = await axios.post(`${BASE_URL}/auth/token/refresh`, {
    refreshToken,
  })

  return res.data
}

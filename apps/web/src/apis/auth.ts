import { ax } from './axios'
import { APILoginUser, APILoginUserProviders } from '@/types/auth'
import { StandardResponse } from '@/types/common'

const authAPI = {
  login: async (providers: APILoginUserProviders): Promise<StandardResponse<APILoginUser>> => {
    const res = await ax.post('/auth/login', providers)
    return res.data
  },
}

export default authAPI

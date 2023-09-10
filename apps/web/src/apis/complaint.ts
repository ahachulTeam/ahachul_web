import { ax } from './axios'
import { StandardResponse } from '@/types/common'

const complaintAPI = {
  fetchComplaintPosts: async (params: any) => {
    const { data } = await ax.get<StandardResponse<any>>('/complaint-posts', { params })
    return data
  },
}

export default complaintAPI

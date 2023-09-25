import { ComplaintMessageRequest } from '@/types/complaint'
import { ax } from './axios'
import { StandardResponse } from '@/types/common'

const complaintAPI = {
  fetchPostComplaintMessage: async (params: ComplaintMessageRequest) => {
    const { data } = await ax.post<StandardResponse<null>>('/complaints/messages', { params })
    return data
  },
}

export default complaintAPI

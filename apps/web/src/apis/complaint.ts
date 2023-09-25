import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { ComplaintMessageRequest } from '@/types/complaint'

const complaintAPI = {
  fetchPostComplaintMessage: async (params: ComplaintMessageRequest) => {
    const { data } = await ax.post<StandardResponse<null>>('/complaints/messages', { params })
    return data
  },
}

export default complaintAPI

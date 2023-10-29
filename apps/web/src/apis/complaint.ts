import { ax } from './axios'
import { ComplaintMessageRequest } from '@/types/complaint'
import { StandardResponse } from '@/types/global'

export const fetchPostComplaintMessage = async (params: ComplaintMessageRequest) => {
  const { data } = await ax.post<StandardResponse<null>>('/complaints/messages', { params })
  return data
}

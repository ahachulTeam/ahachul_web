import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import * as type from '@/types/lost'

export const fetchLostPosts = async (params: type.LostPostsRequest) => {
  const { data } = await ax.get<StandardResponse<type.LostPostsResponse>>('/lost-posts', { params })
  return data
}

export const fetchLostDetail = async (lostId: string) => {
  const { data } = await ax.get<StandardResponse<type.LostDetail>>(`/lost-posts/${lostId}`)
  return data
}

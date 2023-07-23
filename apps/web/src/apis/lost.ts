import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { LostPostsRequest, LostPostsResponse, LostDetail } from '@/types/lost'

const lostAPI = {
  fetchLostPosts: async (params: LostPostsRequest) => {
    const { data } = await ax.get<StandardResponse<LostPostsResponse>>('/lost-posts', { params })
    return data
  },
  fetchLostDetail: async (lostId: string) => {
    const { data } = await ax.get<StandardResponse<LostDetail>>(`/lost-posts/${lostId}`)
    return data
  },
}

export default lostAPI

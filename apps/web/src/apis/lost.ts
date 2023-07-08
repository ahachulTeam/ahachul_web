import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { LostPostsRequest, LostPostsResponse } from '@/types/lost'

const lostAPI = {
  fetchLostPosts: async (params: LostPostsRequest) => {
    const { data } = await ax.get<StandardResponse<LostPostsResponse>>('/lost-posts', { params })
    return data
  },
}

export default lostAPI

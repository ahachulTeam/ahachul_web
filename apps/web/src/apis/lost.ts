import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { LostPostsRequest, LostPostsResponse } from '@/types/lost'

const lostAPI = {
  fetchLostPosts: async (params: LostPostsRequest): Promise<StandardResponse<LostPostsResponse>> => {
    const res = await ax.get('/lost-posts', { params })
    return res.data
  },
}

export default lostAPI

import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

const communityApi = {
  getCommunity: async (req: type.CommunityListQueryModel): Promise<StandardResponse<type.CommunityOverViewModel[]>> => {
    const res = await ax.get('/community-posts', { params: req })
    return res.data
  },
  getCommunityDetail: async (
    req: type.CommunityDetailQueryModel
  ): Promise<StandardResponse<type.CommunityDetailModel>> => {
    const res = await ax.get(`/community-posts/${req.postId}`)
    return res.data
  },
  createArticle: async (req: type.CreateArticleQueryModel) => {
    const hasImage = req?.images && req?.images?.length > 0

    try {
      if (hasImage) {
        console.log('uploading image')
      }

      return await ax.post('/community-posts', {
        title: req.title,
        content: req.content,
        subwayLineId: '1',
        categoryType: req.categoryType || 'FREE',
        hashTags: ['여행', '취미'],
        // images: [],
      })
    } catch (error) {
      console.error('createNotice error')
    }
  },
}

export default communityApi

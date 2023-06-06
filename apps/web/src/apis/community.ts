import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

const communityApi = {
  getCommunity: async (req: type.CommunityListQueryModel): Promise<StandardResponse<type.CommunityOverViewModel[]>> => {
    const res = await ax.get('/v1/community-posts', { params: req })
    return res.data
  },
  createArticle: async (req: type.CreateArticleQueryModel) => {
    const hasImage = req?.images && req?.images?.length > 0

    try {
      if (hasImage) {
        console.log('uploading image')
      }

      return await ax.post('/v1/community-posts', {
        title: req.title,
        content: req.content,
        subwayLineId: req.subwayLineId,
        categoryType: req.categoryType || 'FREE',
        // images: [],
      })
    } catch (error) {
      console.error('createNotice error')
    }
  },
}

export default communityApi

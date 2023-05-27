import { ax } from './axios'
import * as type from '@/types/community'

const communityApi = {
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

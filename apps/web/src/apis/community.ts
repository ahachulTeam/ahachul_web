import { ax } from './axios'
import { Picture } from '@/types'
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
    // const hasImage = req?.images && req?.images?.length > 0

    console.log('req :', req)

    try {
      // const formData = new FormData()
      // for (const [key, value] of Object.entries(req)) {
      //   console.log('req key:', key)
      //   console.log('req value:', value)
      //   formData.append(key, value)
      // }
      // if (hasImage) {
      //   req?.images?.forEach((image: Picture) => {
      //     formData.append('imageFiles', image?.file, image.name)
      //   })
      // }
      // console.log('formData :', formData)
      // return await ax.post('/community-posts', formData)
    } catch (error) {
      console.error('createNotice error')
    }
  },
}

export default communityApi

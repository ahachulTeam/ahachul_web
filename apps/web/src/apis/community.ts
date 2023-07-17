import { ax } from './axios'
import { Picture } from '@/types'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

const communityApi = {
  getCommunity: async (req: type.CommunityListQueryModel): Promise<StandardResponse<type.CommunityListServerModel>> => {
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
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const hasImage = req?.imageFiles && req?.imageFiles?.length > 0

    try {
      const formData = new FormData()
      for (const [key, value] of Object.entries(req)) {
        if (key === 'hashTags') {
          formData.append(key, value?.join(','))
        } else if (key !== 'imageFiles') {
          formData.append(key, value)
        }
      }
      if (hasImage) {
        req?.imageFiles?.forEach((image: Picture) => {
          if (image.file) {
            formData.append('imageFiles', image.file)
          }
        })
      }
      return await ax.post('/community-posts', formData, axiosConfig)
    } catch (error) {
      console.error('createNotice error')
    }
  },
  getComments: async (params: type.CommunityDetailQueryModel): Promise<StandardResponse<type.CommentsServerModel>> => {
    const res = await ax.get(`/community-comments`, { params })
    return res.data
  },
  addComment: async (req: type.CreateCommentQueryModel) => await ax.post(`/community-comments`, req),
  updateComment: async (req: type.PutCommentQueryModel) =>
    await ax.patch(`/community-comments/${req.commentId}`, { content: req.content }),
  deleteComment: async (req: Pick<type.PutCommentQueryModel, 'commentId'>) =>
    await ax.delete(`/community-comments/${req.commentId}`),
  addLike: async (req: type.CommunityDetailQueryModel) => await ax.post(`/community-posts/${req.postId}/like`),
  removeLike: async (req: type.CommunityDetailQueryModel) => await ax.delete(`/community-posts/${req.postId}/like`),
  addHate: async (req: type.CommunityDetailQueryModel) => await ax.post(`/community-posts/${req.postId}/hate`),
  removeHate: async (req: type.CommunityDetailQueryModel) => await ax.delete(`/community-posts/${req.postId}/hate`),
}

export default communityApi

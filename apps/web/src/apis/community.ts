import { ax } from './axios'
import { Picture } from '@/types'
import * as type from '@/types/community'
import { StandardResponse } from '@/types/global'

export const getCommunity = async (req: type.CommunityListQueryModel) => {
  const res = await ax.get<StandardResponse<type.CommunityListServerModel>>('/community-posts', { params: req })
  return res.data
}

export const getCommunityDetail = async (req: type.CommunityDetailQueryModel) => {
  const res = await ax.get<StandardResponse<type.CommunityDetailModel>>(`/community-posts/${req.postId}`)
  return res.data
}

export const createArticle = async (req: type.CreateArticleQueryModel) => {
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
    return await ax.post<StandardResponse<type.CommunityDetailModel>>('/community-posts', formData, axiosConfig)
  } catch (error) {
    console.error('createNotice error')
  }
}

export const getComments = async (params: type.CommunityDetailQueryModel) => {
  const res = await ax.get<StandardResponse<type.CommentsServerModel>>(`/community-comments`, { params })
  return res.data
}

export const addComment = async (req: type.CreateCommentQueryModel) =>
  await ax.post<StandardResponse<type.CreateCommentQueryModel>>(`/community-comments`, req)

export const updateComment = async (req: type.PutCommentQueryModel) =>
  await ax.patch<StandardResponse<type.PutCommentQueryModel>>(`/community-comments/${req.commentId}`, {
    content: req.content,
  })

export const deleteComment = async (req: Pick<type.PutCommentQueryModel, 'commentId'>) =>
  await ax.delete<StandardResponse<type.DeleteCommentQueryModel>>(`/community-comments/${req.commentId}`)

export const addLike = async (req: type.CommunityDetailQueryModel) =>
  await ax.post<StandardResponse<null>>(`/community-posts/${req.postId}/like`)

export const removeLike = async (req: type.CommunityDetailQueryModel) =>
  await ax.delete<StandardResponse<null>>(`/community-posts/${req.postId}/like`)

export const addHate = async (req: type.CommunityDetailQueryModel) =>
  await ax.post<StandardResponse<null>>(`/community-posts/${req.postId}/hate`)

export const removeHate = async (req: type.CommunityDetailQueryModel) =>
  await ax.delete<StandardResponse<null>>(`/community-posts/${req.postId}/hate`)

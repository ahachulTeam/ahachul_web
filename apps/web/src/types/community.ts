import { Picture } from './picture'

export type CommunityCategoryType = 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
export type CommunitySortType = 'likes' | 'createdAt' | 'views'

export interface CommunityListQueryModel {
  categoryType?: CommunityCategoryType
  subwayLine?: string
  content?: string
  hashTag?: string
  page: number
  size: number
  sort: CommunitySortType
}

export interface CommunityOverViewModel {
  id: number
  title: string
  content: string
  categoryType: CommunityCategoryType
  commentCnt: number
  viewCnt: number
  likeCnt: number
  region: string
  createdAt: string
  createdBy: string
  writer: string
  regionType: string
  image: {
    imageId: number
    imageUrl: string
  }
}

export interface CommunityListServerModel {
  hasNext: boolean
  posts: CommunityOverViewModel[]
}

export interface CommunityDetailQueryModel {
  postId: number
}

export interface CommunityDetailModel {
  categoryType: CommunityCategoryType
  content: string
  createdAt: string
  createdBy: string
  hashTags: string[]
  id: number
  images: Array<{ imageId: number; imageUrl: string }>
  hateCnt: number
  hateYn: 'Y' | 'N'
  likeCnt: number
  likeYn: 'Y' | 'N'
  regionType: string
  title: string
  viewCnt: number
  writer: string
}

export interface CreateArticleQueryModel {
  title: string
  content: string
  imageFiles?: Picture[] | []
  hashTags?: string[]
  categoryType?: CommunityCategoryType
  subwayLineId?: number
}

export interface CreateCommentQueryModel extends CommunityDetailQueryModel {
  upperCommentId?: number
  content: string
}

export interface PutCommentQueryModel {
  commentId: number
  content: string
}

export interface CommentsServerModel {
  comments: [
    {
      parentComment: {
        id: number
        upperCommentId: number | null
        content: string
        status: string
        createdAt: string
        createdBy: string
        writer: string
      }
      childComments: [
        {
          id: number
          upperCommentId: number | null
          content: string
          status: string
          createdAt: string
          createdBy: string
          writer: string
        }
      ]
    }
  ]
}

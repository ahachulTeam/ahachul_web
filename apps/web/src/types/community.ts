import { Picture } from './picture'

export type CommunityCategoryType = 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
export interface CommunityListQueryModel {
  categoryType?: 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
  subwayLine?: string
  title?: string
  content?: string
  hashTag?: string
  page: number
  size: number
  sort: 'likes' | 'createdAt' | 'views'
}

export interface CommunityOverViewModel {
  id: number
  title: string
  content: string
  categoryType: CommunityCategoryType
  views: number
  likes: number
  region: string
  createdAt: string
  createdBy: string
  writer: string
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
  likes: number
  region: string
  title: string
  views: number
  writer: string
}

export interface CreateArticleQueryModel {
  title: string
  content: string
  imageFiles?: Picture[] | []
  hashTags?: string[]
  categoryType: CommunityCategoryType
  subwayLineId?: number
}

export interface CreateCommentQueryModel extends CommunityDetailQueryModel {
  upperCommentId?: number
  content: string
}

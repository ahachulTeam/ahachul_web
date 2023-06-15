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
  categoryType: string
  views: number
  likes: number
  region: string
  createdAt: string
  createdBy: string
}

export interface CommunityDetailQueryModel {
  postId: number
}

export interface CommunityDetailModel {
  id: number
  title: string
  content: string
  categoryType: 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
  hashTags: string[]
  views: number
  likes: number
  region: any // fixme
  createdAt: string
  createdBy: string
  writer: string
}

export interface CreateArticleQueryModel {
  title: string
  content: string
  images?: File[] | []
  hashTags?: string[]
  categoryType: 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
  subwayLineId?: number
}

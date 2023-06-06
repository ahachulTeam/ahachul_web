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

export interface CommunityDetailModel {
  _id: number
  title: string
  img_url: string
  content: string
  time: string
  author: string
  likeCnt: number
  hateCnt: number
  commentCnt: number
  viewCnt: number
  hashtags: string[]
}

export interface CreateArticleQueryModel {
  title: string
  content: string
  images?: File[] | []
  categoryType: 'FREE' | 'INSIGHT' | 'ISSUE' | 'HUMOR'
  subwayLineId: string
}

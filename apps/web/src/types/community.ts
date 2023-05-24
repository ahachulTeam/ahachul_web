export type CommunityDetailModel = {
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

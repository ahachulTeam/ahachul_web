import { InfiniteFetch, KeyOf } from './common'

export enum LostStatus {
  PROGRESS = 'PROGRESS',
  COMPLETE = 'COMPLETE',
}

export interface LostPost {
  id: string
  title: string
  content: string
  writer: string
  createdBy: string
  date: string
  subwayLine: number
  chats: number
  status: KeyOf<typeof LostStatus>
  imgUrl: string
}

export type LostType = 'LOST' | 'ACQUIRE'

export interface LostPostsRequest {
  page: string
  size: string
  lostType: LostType
  subwayLineId?: string
  origin?: string
}

export interface LostPostsResponse extends InfiniteFetch {
  posts: LostPost[]
}

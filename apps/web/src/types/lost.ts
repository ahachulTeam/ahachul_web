import { InfiniteFetchResponse, KeyOf } from './global'

export enum LostStatus {
  PROGRESS = 'PROGRESS',
  COMPLETE = 'COMPLETE',
}

export enum LostTypes {
  ACQUIRE = 'ACQUIRE',
  LOST = 'LOST',
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
  image: Image
}

export type LostType = 'ACQUIRE' | 'LOST'

export interface LostPostsRequest {
  page: string
  size: string
  lostType: LostType
  subwayLineId?: string
  origin?: string
}

export interface LostPostsResponse extends InfiniteFetchResponse {
  posts: LostPost[]
}

export type FilterKeys = KeyOf<Partial<LostPostsRequest>>

type Image = {
  imageId: number
  imageUrl: string
}

export interface LostDetail {
  id: number
  title: string
  content: string
  writer: string
  createdBy: string
  date: string
  subwayLine: number
  chats: number
  status: KeyOf<typeof LostStatus>
  storage: string
  storageNumber: string
  pageUrl: string
  images: Image[]
}

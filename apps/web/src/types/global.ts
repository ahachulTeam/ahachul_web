import { ReactNode } from 'react'
import { ToastOptions } from 'react-toastify'
import { ResponseCode, ResponseMessages } from '@/constants'

export type ToastType = {
  success: (content: ReactNode, option?: ToastOptions<{}> | undefined) => void
  error: (content: ReactNode, option?: ToastOptions<{}> | undefined) => void
}

export type KeyOf<T> = keyof T
export type ValueOf<T> = T[keyof T]
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>

export type ResponseStatus = {
  code: ValueOf<typeof ResponseCode>
  message: ValueOf<typeof ResponseMessages>
}

export interface StandardResponse<T> extends ResponseStatus {
  result: T
}

export interface PublicPresignedServerModel {
  config: any
  data: {
    url: string
    fields: {
      key: string
      bucket: string
      'X-Amz-Algorithm': string
      'X-Amz-Credential': string
      'X-Amz-Date': string
      Policy: string
      'X-Amz-Signature': string
    }
  }
}

export type UrlQueryType = Record<string, string | string[]>

export interface InfiniteFetchResponse {
  hasNext: boolean
}

export type YesNo = 'Y' | 'N'

export type HashTag = {
  text: string
}

export interface HashTagsServerModel {
  ranks: string[]
}

export type Picture = {
  imgUrl: string
  name: string
  file?: File
}
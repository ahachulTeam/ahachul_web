import { CommonResponseMessages, ErrorCode } from '@/constants'

export type KeyOf<T> = keyof T
export type ValueOf<T> = T[keyof T]
export type IndexOf<T, K extends KeyOf<T>> = ValueOf<T[K]>

export interface StandardResponse<T> {
  code: ErrorCode
  message: CommonResponseMessages
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

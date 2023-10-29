import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { HashTagsServerModel } from '@/types/global'

export const getHottestHashtags = async () => {
  const res = await ax.get<Promise<StandardResponse<HashTagsServerModel>>>('ranks/hashtags')
  return res.data
}

import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { lostKeys } from './keys'
import lostAPI from '@/apis/lost'
import { LostDetail } from '@/types/lost'

import * as T from '@/utils/try'

const useFetchLostPosts = (lostId: string): UseQueryResult<LostDetail> => {
  return useQuery(lostKeys.detail(lostId), async () => {
    const res = await lostAPI.fetchLostDetail(lostId)
    const parseData = T.parseResponse(res)
    return T.getOrElse(parseData, () => ({}))
  })
}

export default useFetchLostPosts

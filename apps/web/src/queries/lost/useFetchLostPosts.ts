import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { lostKeys } from './keys'
import lostAPI from '@/apis/lost'
import type { LostPostsRequest, LostPostsResponse } from '@/types/lost'
import * as T from '@/utils/try'

const useFetchLostPosts = (
  filters: Omit<LostPostsRequest, 'page' | 'size'>
): UseInfiniteQueryResult<LostPostsResponse> => {
  return useInfiniteQuery(
    lostKeys.list(filters),
    async ({ pageParam = 0 }) => {
      const res = await lostAPI.fetchLostPosts({ ...filters, page: pageParam, size: '10' })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
    },
    {
      getNextPageParam: (lastPage, page) => lastPage.hasNext && page.length + 1,
    }
  )
}

export default useFetchLostPosts

import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { lostKeys } from './keys'
import lostAPI from '@/apis/lost'
import { useFilterList } from '@/hooks'
import { LostPostsResponse, FilterKeys, LostType } from '@/types/lost'
import * as T from '@/utils/try'

const useFetchLostPosts = (lostType: LostType): UseInfiniteQueryResult<LostPostsResponse> => {
  const { filter } = useFilterList<FilterKeys>('subwayLineId', 'origin')

  const filters = {
    ...filter,
    lostType,
  } as const

  return useInfiniteQuery(
    lostKeys.list(filters),
    async ({ pageParam = 0 }) => {
      const res = await lostAPI.fetchLostPosts({ ...filters, page: pageParam, size: '24' })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
    },
    {
      getNextPageParam: lastPage => lastPage.hasNext,
    }
  )
}

export default useFetchLostPosts

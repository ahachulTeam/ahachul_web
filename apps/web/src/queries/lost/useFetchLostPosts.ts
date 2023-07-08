import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { lostKeys } from './keys'
import lostAPI from '@/apis/lost'
import { useFilterList } from '@/hooks'
import { LostTypes, LostPostsResponse, FilterKeys } from '@/types/lost'
import * as T from '@/utils/try'

const useFetchLostPosts = (): UseInfiniteQueryResult<LostPostsResponse> => {
  const { filter } = useFilterList<FilterKeys>('subwayLineId', 'origin', 'lostType')

  const filters = {
    ...filter,
    lostType: filter.lostType === LostTypes.ACQUIRE ? LostTypes.ACQUIRE : LostTypes.LOST,
  } as const

  return useInfiniteQuery(
    lostKeys.list(filters),
    async ({ pageParam = 0 }) => {
      const res = await lostAPI.fetchLostPosts({ ...filters, page: pageParam, size: '24' })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
    },
    {
      getNextPageParam: (lastPage, page) => lastPage.hasNext && page.length + 1,
    }
  )
}

export default useFetchLostPosts

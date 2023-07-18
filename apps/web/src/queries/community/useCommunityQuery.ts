import { removeEmptyProperties } from '@ahhachul/lib'
import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'

import { useRouter } from 'next/router'
import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import * as type from '@/types/community'
import * as T from '@/utils/try'

const useCommunityQuery = (): UseInfiniteQueryResult<type.CommunityListServerModel> => {
  const { query } = useRouter()

  const queryFilters = removeEmptyProperties({
    page: query?.page,
    size: query?.size,
    hashTag: query?.hashTag as string,
    content: query?.content as string,
    subwayLine: query?.lines as string,
    sort: query?.sort as type.CommunitySortType,
    categoryType: (query?.tab || 'FREE') as type.CommunityCategoryType,
  })

  const reqParams = {
    ...queryFilters,
    ...{ page: Number(queryFilters?.page) || 0 },
    ...{ size: Number(queryFilters?.size) || 24 },
    ...{ sort: queryFilters?.sort || 'createdAt,desc' },
  }

  return useInfiniteQuery(
    communityKeys.list(reqParams),
    async ({ pageParam = 0 }) => {
      const res = await communityAPI.getCommunity({ ...reqParams, page: pageParam, size: 24 })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
    },
    {
      suspense: false,
      getNextPageParam: (lastPage, page) => lastPage.hasNext && page.length - 1,
    }
  )
}

export default useCommunityQuery

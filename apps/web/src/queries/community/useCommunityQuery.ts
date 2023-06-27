import { UseQueryResult, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

type Options = Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getCommunity>>['result']>, 'enabled'>

const useCommunityQuery = (
  filters: type.CommunityListQueryModel,
  options?: Options
): UseQueryResult<Pick<StandardResponse<type.CommunityOverViewModel[]>, 'result'>> => {
  const reqParams = {
    ...filters,
    ...{ page: filters?.page || 1 },
    ...{ size: filters?.size || 12 },
    ...{ sort: filters?.sort || 'createdAt' },
  }

  return useQuery({
    queryKey: communityKeys.list(reqParams),
    queryFn: () => communityAPI.getCommunity(reqParams),
    enabled: options?.enabled,
    suspense: false,
    select: ({ result }) => ({
      result,
    }),
  })
}

export default useCommunityQuery

import { UseQueryResult, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

type Options = Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getCommunity>>['result']>, 'enabled'>

const useCommunityQuery = (
  filters: type.CommunityListQueryModel,
  options?: Options
): UseQueryResult<Pick<StandardResponse<type.CommunityListServerModel>, 'result'>> => {
  const reqParams = {
    ...filters,
    ...{ page: filters?.page || 0 },
    ...{ size: filters?.size || 12 },
    ...{ sort: filters?.sort || 'createdAt' },
  }

  return useQuery({
    queryKey: communityKeys.list(reqParams),
    queryFn: () => communityAPI.getCommunity(reqParams),
    select: ({ result }) => ({
      result,
    }),
    suspense: false,
    enabled: options?.enabled,
  })
}

export default useCommunityQuery

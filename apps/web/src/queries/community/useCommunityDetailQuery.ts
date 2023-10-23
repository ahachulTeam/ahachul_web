import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'

import { communityKeys } from './keys'
import communityAPI from '@/apis/community'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'
import * as T from '@/utils/try'

const useCommunityDetailQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getCommunityDetail>>>, 'enabled'>
): UseQueryResult<StandardResponse<type.CommunityDetailModel>['result']> => {
  return useQuery({
    queryKey: communityKeys.detail(postId),
    queryFn: async () => {
      const res = await communityAPI.getCommunityDetail({ postId })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({}))
    },
    enabled: options?.enabled || false,
  })
}

export default useCommunityDetailQuery

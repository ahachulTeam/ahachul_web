import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query'

import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

const useCommunityDetailQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getCommunityDetail>>>, 'enabled'>
): UseQueryResult<Pick<StandardResponse<type.CommunityDetailModel>, 'result'>> => {
  return useQuery({
    queryKey: communityKeys.detail(postId),
    queryFn: () => communityAPI.getCommunityDetail({ postId }),
    select: ({ result }) => ({
      result,
    }),
    suspense: false,
    enabled: options?.enabled || false,
  })
}

export default useCommunityDetailQuery

import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'

import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import * as type from '@/types/community'

export const useCommunityCommentsQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getComments>>>, 'enabled'>
) => {
  return useQuery({
    queryKey: communityKeys.comments(postId),
    queryFn: () => communityAPI.getComments({ postId }),
    suspense: false,
    enabled: options?.enabled || false,
  })
}

export const useCommunityPostComments = () => {
  return useMutation({
    mutationFn: (req: type.CreateCommentQueryModel) => communityAPI.addComment(req),
  })
}

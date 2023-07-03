import { UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'

import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { StandardResponse } from '@/types/common'
import * as type from '@/types/community'

export const useCommunityCommentsQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getComments>>>, 'enabled'>
): UseQueryResult<Pick<StandardResponse<type.CommentsServerModel>['result'], 'comments'>> => {
  return useQuery({
    queryKey: communityKeys.comments(postId),
    queryFn: () => communityAPI.getComments({ postId }),
    suspense: false,
    enabled: options?.enabled || false,
    select: ({ result: { comments } }) => ({
      comments,
    }),
  })
}

export const useCommunityPostComments = () => {
  return useMutation({
    mutationFn: (req: type.CreateCommentQueryModel) => communityAPI.addComment(req),
  })
}

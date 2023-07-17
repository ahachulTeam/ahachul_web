import { UseQueryOptions, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useEffect } from 'react'
import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { useToast } from '@/hooks'
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
  const toast = useToast()

  return useMutation({
    mutationFn: (req: type.CreateCommentQueryModel) => communityAPI.addComment(req),
    onSuccess: () => {
      toast.success('댓글을 작성했다.')
    },
  })
}

export const useCommunityUpdateComment = () => {
  const toast = useToast()

  return useMutation({
    mutationFn: (req: type.PutCommentQueryModel) => communityAPI.updateComment(req),
    onSuccess: () => {
      toast.success('댓글을 수정했다.')
    },
  })
}

export const useCommunityDeleteComment = () => {
  const toast = useToast()

  return useMutation({
    mutationFn: (req: Pick<type.PutCommentQueryModel, 'commentId'>) => communityAPI.deleteComment(req),
    onSuccess: () => {
      toast.success('댓글을 삭제했다.')
    },
  })
}

export const useCommentsManagement = (postId?: number) => {
  const queryClient = useQueryClient()
  const { mutate: createComment, isSuccess: createCommentSuccess } = useCommunityPostComments()
  const { mutate: updateComment, isSuccess: updateCommentSuccess } = useCommunityUpdateComment()
  const { mutate: deleteComment, isSuccess: deleteParentCommentSuccess } = useCommunityDeleteComment()

  useEffect(() => {
    if (!postId) {
      return
    }

    if (createCommentSuccess || updateCommentSuccess || deleteParentCommentSuccess) {
      queryClient.invalidateQueries(communityKeys.comments(postId))
    }
  }, [createCommentSuccess, deleteParentCommentSuccess, postId, queryClient, updateCommentSuccess])

  return { createComment, updateComment, deleteComment }
}

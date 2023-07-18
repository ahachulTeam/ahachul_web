import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useEffect } from 'react'
import { communityKeys } from '../queryKeys'
import communityAPI from '@/apis/community'
import { CommunityDetailQueryModel } from '@/types/community'

export const useCommunityPostLike = () => {
  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.addLike(req),
  })
}

export const useCommunityRemoveLike = () => {
  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.removeLike(req),
  })
}

export const useCommunityPostHate = () => {
  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.addHate(req),
  })
}

export const useCommunityRemoveHate = () => {
  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.removeHate(req),
  })
}

export const useManagementCommunityPostReacting = (postId?: number) => {
  const queryClient = useQueryClient()

  const { mutate: likes, isSuccess: likeSuccess } = useCommunityPostLike()
  const { mutate: removeLikes, isSuccess: removeLikesSuccess } = useCommunityRemoveLike()
  const { mutate: hates, isSuccess: hateSuccess } = useCommunityPostHate()
  const { mutate: removeHates, isSuccess: removeHatesSuccess } = useCommunityRemoveHate()

  useEffect(() => {
    if (!postId) {
      return
    }

    if (likeSuccess || removeLikesSuccess || hateSuccess || removeHatesSuccess) {
      queryClient.invalidateQueries(communityKeys.detail(postId))
    }
  }, [hateSuccess, likeSuccess, postId, queryClient, removeHatesSuccess, removeLikesSuccess])

  return {
    likes,
    removeHates,
    removeLikes,
    hates,
  }
}

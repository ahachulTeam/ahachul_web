import { useMutation } from '@tanstack/react-query'

import {} from '../queryKeys'
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

export const useManagementCommunityPostReacting = () => {
  const { mutate: likes } = useCommunityPostLike()
  const { mutate: removeLikes } = useCommunityRemoveLike()
  const { mutate: hates } = useCommunityPostHate()
  const { mutate: removeHates } = useCommunityRemoveHate()

  return {
    likes,
    removeHates,
    removeLikes,
    hates,
  }
}

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

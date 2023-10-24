import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/router'
import { communityKeys } from './keys'
import communityAPI from '@/apis/community'
import { YesNo } from '@/types/common'
import type { CommunityDetailQueryModel, CommunityDetailModel } from '@/types/community'

export const useCommunityPostLike = () => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const postQueryKey = communityKeys.detail(Number(query?.id!))

  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.addLike(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedLikeYn = 'Y' as YesNo
            return {
              ...oldData,
              likeYn: updatedLikeYn,
              likeCnt: oldData.likeCnt + 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as CommunityDetailModel)
      }
    },
    onSettled: () => queryClient.invalidateQueries(postQueryKey),
    onError: (err, values, rollback) => {
      if (rollback) {
        rollback() // 에러시 롤백
      } else {
        // throw new Error(err)
      }
    },
  })
}

export const useCommunityRemoveLike = () => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const postQueryKey = communityKeys.detail(Number(query?.id!))

  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.removeLike(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedLikeYn = 'N' as YesNo
            return {
              ...oldData,
              likeYn: updatedLikeYn,
              likeCnt: oldData.likeCnt - 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as CommunityDetailModel)
      }
    },
    onSettled: () => queryClient.invalidateQueries(postQueryKey),
    onError: (err, values, rollback) => {
      if (rollback) {
        rollback() // 에러시 롤백
      } else {
        // throw new Error(err)
      }
    },
  })
}

export const useCommunityPostHate = () => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const postQueryKey = communityKeys.detail(Number(query?.id!))

  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.addHate(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedHateYn = 'Y' as YesNo
            return {
              ...oldData,
              hateYn: updatedHateYn,
              hateCnt: oldData.hateCnt + 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as CommunityDetailModel)
      }
    },
    onSettled: () => queryClient.invalidateQueries(postQueryKey),
    onError: (err, values, rollback) => {
      if (rollback) {
        rollback() // 에러시 롤백
      } else {
        // throw new Error(err)
      }
    },
  })
}

export const useCommunityRemoveHate = () => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const postQueryKey = communityKeys.detail(Number(query?.id!))

  return useMutation({
    mutationFn: (req: CommunityDetailQueryModel) => communityAPI.removeHate(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedHateYn = 'N' as YesNo
            return {
              ...oldData,
              hateYn: updatedHateYn,
              hateCnt: oldData.hateCnt - 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as CommunityDetailModel)
      }
    },
    onSettled: () => queryClient.invalidateQueries(postQueryKey),
    onError: (err, values, rollback) => {
      if (rollback) {
        rollback() // 에러시 롤백
      } else {
        // throw new Error(err)
      }
    },
  })
}

export const useManagementCommunityPostReacting = () => {
  const { mutate: likes } = useCommunityPostLike()
  const { mutate: removeLikes } = useCommunityRemoveLike()

  const getToggleLike = (likeYn?: YesNo) => {
    return likeYn === 'Y' ? removeLikes : likes
  }

  return {
    getToggleLike,
  }
}

import { removeEmptyProperties } from '@ahhachul/lib'
import {
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as communityAPI from '@/apis/community'
import { PATH } from '@/constants'
import { useToast } from '@/hooks/global'
import type * as type from '@/types/community'
import * as globalTypes from '@/types/global'
import * as T from '@/utils/try'

export const communityKeys = {
  all: ['community'] as const,
  lists: () => [...communityKeys.all, 'list'] as const,
  list: (filters: type.CommunityListQueryModel) => [...communityKeys.lists(), { filters }] as const,
  details: () => [...communityKeys.all, 'detail'] as const,
  detail: (postId: number) => [...communityKeys.details(), postId] as const,
  comments: (postId: number) => [...communityKeys.all, 'comments', postId] as const,
}

export const useCommunityQuery = (): UseInfiniteQueryResult<type.CommunityListServerModel> => {
  const { query } = useRouter()

  const queryFilters = removeEmptyProperties({
    page: query?.page,
    size: query?.size,
    hashTag: query?.hashTag as string,
    content: query?.content as string,
    subwayLineId: query?.subwayLineId as string,
    sort: query?.sort as type.CommunitySortType,
    hotPostYn: ((!query?.tab || query?.tab === 'HOT') && 'Y') as 'Y' | 'N',
    categoryType: (!query?.tab || query?.tab === 'HOT' ? '' : query?.tab) as type.CommunityCategoryType,
  })

  const reqParams = {
    ...queryFilters,
    ...{ page: Number(queryFilters?.page) || 0 },
    ...{ size: Number(queryFilters?.size) || 12 },
    ...{ sort: queryFilters?.sort || 'createdAt,desc' },
  }

  return useInfiniteQuery(
    communityKeys.list(reqParams),
    async ({ pageParam = 0 }) => {
      const res = await communityAPI.getCommunity({ ...reqParams, page: pageParam, size: 12 })
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ posts: [], hasNext: false }))
    },
    {
      suspense: true,
      getNextPageParam: (lastPage, page) => lastPage.hasNext && page.length,
    }
  )
}

export const useCommunityCommentsQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getComments>>>, 'enabled'>
): UseQueryResult<Pick<globalTypes.StandardResponse<type.CommentsServerModel>['result'], 'comments'>> => {
  return useQuery({
    queryKey: communityKeys.comments(postId),
    queryFn: () => communityAPI.getComments({ postId }),
    enabled: options?.enabled || false,
    select: ({ result: { comments } }) => ({
      comments,
    }),
  })
}

export const useCommunityDetailQuery = (
  postId: number,
  options?: Pick<UseQueryOptions<Awaited<ReturnType<typeof communityAPI.getCommunityDetail>>>, 'enabled'>
): UseQueryResult<globalTypes.StandardResponse<type.CommunityDetailModel>['result']> => {
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

export const useCreateArticle = () => {
  const router = useRouter()

  const { success } = useToast()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: type.CreateArticleQueryModel) => communityAPI.createArticle(req),
    onSuccess: () => {
      success('글을 생성했다.')
      queryClient.invalidateQueries(communityKeys.lists())
      router.push(PATH.COMMUNITY, undefined, { shallow: true })
    },
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

export const useCommunityPostLike = () => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const postQueryKey = communityKeys.detail(Number(query?.id!))

  return useMutation({
    mutationFn: (req: type.CommunityDetailQueryModel) => communityAPI.addLike(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: type.CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedLikeYn = 'Y' as globalTypes.YesNo
            return {
              ...oldData,
              likeYn: updatedLikeYn,
              likeCnt: oldData.likeCnt + 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as type.CommunityDetailModel)
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
    mutationFn: (req: type.CommunityDetailQueryModel) => communityAPI.removeLike(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: type.CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedLikeYn = 'N' as globalTypes.YesNo
            return {
              ...oldData,
              likeYn: updatedLikeYn,
              likeCnt: oldData.likeCnt - 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as type.CommunityDetailModel)
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
    mutationFn: (req: type.CommunityDetailQueryModel) => communityAPI.addHate(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: type.CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedHateYn = 'Y' as globalTypes.YesNo
            return {
              ...oldData,
              hateYn: updatedHateYn,
              hateCnt: oldData.hateCnt + 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as type.CommunityDetailModel)
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
    mutationFn: (req: type.CommunityDetailQueryModel) => communityAPI.removeHate(req),
    onMutate: () => {
      const oldData = queryClient.getQueryData(postQueryKey)

      if (oldData) {
        queryClient.cancelQueries(postQueryKey)
        queryClient.setQueryData(postQueryKey, (oldData: type.CommunityDetailModel | undefined) => {
          if (oldData) {
            const updatedHateYn = 'N' as globalTypes.YesNo
            return {
              ...oldData,
              hateYn: updatedHateYn,
              hateCnt: oldData.hateCnt - 1,
            }
          }
          return oldData
        })

        return () => queryClient.setQueryData(postQueryKey, oldData as type.CommunityDetailModel)
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

  const getToggleLike = (likeYn?: globalTypes.YesNo) => {
    return likeYn === 'Y' ? removeLikes : likes
  }

  return {
    getToggleLike,
  }
}

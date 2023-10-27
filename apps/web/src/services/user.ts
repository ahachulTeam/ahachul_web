import { UseQueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import * as userApi from '@/apis/users'
import { useAuth } from '@/context'
import * as type from '@/types/user'

export const useMyProfileQuery = (options?: UseQueryOptions<type.UserModel>): UseQueryResult<type.UserModel> =>
  useQuery({
    queryKey: ['user', 'me'],
    queryFn: userApi.getMyProfile,
    select: res => res.result,
    enabled: options?.enabled || false,
  })

export const useMyProfileMutation = () => {
  const { auth } = useAuth()

  return useMutation({
    mutationFn: ({ nickname }: { nickname: type.UserModel['nickname'] }) => userApi.updateMyProfile({ nickname }),
    onSuccess: res => {
      auth.changeProfile(res.result.nickname)
    },
  })
}

export const useUserProfileQuery = (
  { memberId }: { memberId: type.UserModel['memberId'] },
  options?: UseQueryOptions<type.UserModel>
) => {
  return useQuery({
    queryKey: ['user', memberId],
    queryFn: () => userApi.getUserProfile({ memberId }),
    select: res => res.result,
    enabled: options?.enabled,
  })
}

export const useVerifyNickname = () =>
  useMutation({
    mutationFn: ({ nickname }: { nickname: type.UserModel['nickname'] }) => userApi.verifyMyNickname({ nickname }),
  })

import { UseQueryOptions, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as userApi from '@/apis/users'
import { useAuth } from '@/context'
import * as type from '@/types/user'
import * as T from '@/utils/try'

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

export const useMyStationsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ stations }: { stations: string[] }) => userApi.updateMyStations({ stations }),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', 'me', 'stations'])
    },
  })
}

export const useMyStationsQuery = (
  options?: UseQueryOptions<type.UserStationsModel>
): UseQueryResult<type.UserStationsModel> =>
  useQuery({
    queryKey: ['user', 'me', 'stations'],
    queryFn: async () => {
      const res = await userApi.getMyStations()
      const parsedData = T.parseResponse(res)
      return T.getOrElse(parsedData, () => ({ stationInfoList: [] }))
    },
    enabled: options?.enabled || false,
  })

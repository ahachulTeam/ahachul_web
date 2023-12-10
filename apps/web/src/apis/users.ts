import { AxiosInstance } from 'axios'
import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { UserModel, UserStationsModel, UserUpdateStationsModelResponse, VerifyNicknameModel } from '@/types/user'

export const getMyProfile = async () => {
  const res = await ax.get<StandardResponse<UserModel>>('/members')
  return res.data
}

export const updateMyProfile = async ({ nickname }: { nickname: UserModel['nickname'] }) => {
  const res = await ax.patch<StandardResponse<UserModel>>('/members', { nickname, gender: 'MALE', ageRange: 20 })
  return res.data
}

export const verifyMyNickname = async ({ nickname }: { nickname: UserModel['nickname'] }) => {
  const res = await ax.post<StandardResponse<Omit<VerifyNicknameModel, 'email'>>>('/members/check-nickname', {
    nickname,
  })
  return res.data
}

export const getUserProfile = async ({ memberId }: { memberId: UserModel['memberId'] }) => {
  const res = await ax.get<StandardResponse<UserModel>>(`/users/${memberId}/profile`)
  return res.data
}

export const getMyProfileServerSide = (_api: AxiosInstance) => async () => {
  const res = await _api.get<Promise<StandardResponse<UserModel>>>('/members')
  return res.data
}

export const getMyStations = async () => {
  const res = await ax.get<StandardResponse<UserStationsModel>>('/members/bookmarks/stations')
  return res.data
}

export const updateMyStations = async ({ stationNames }: { stationNames: string }) => {
  const res = await ax.post<StandardResponse<UserUpdateStationsModelResponse>>('/members/bookmarks/stations', {
    stationNames: ['강남'],
  })
  return res.data
}

export const getMyStationsServerSide = async (_api: AxiosInstance) => {
  const res = await _api.get<Promise<StandardResponse<UserStationsModel>>>('/members/bookmarks/stations')
  return res.data
}

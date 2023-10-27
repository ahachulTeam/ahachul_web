import { ax } from './axios'
import { StandardResponse } from '@/types/global'
import { UserModel, VerifyNicknameModel } from '@/types/user'

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

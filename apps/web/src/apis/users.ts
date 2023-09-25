import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { UserModel, VerifyNicknameModel } from '@/types/user'

// 내 정보 조회
export const getMyProfile = async () => {
  const res = await ax.get<StandardResponse<UserModel>>('/members')
  return res.data
}
// 내 정보 수정
export const updateMyProfile = async ({ nickname }: { nickname: UserModel['nickname'] }) => {
  const res = await ax.patch<StandardResponse<UserModel>>('/members', { nickname, gender: 'MALE', ageRange: 20 })
  return res.data
}
// 사용자 닉네임 중복 체크
export const verifyMyNickname = async ({ nickname }: { nickname: UserModel['nickname'] }) => {
  const res = await ax.post<StandardResponse<Omit<VerifyNicknameModel, 'email'>>>('/members/check-nickname', {
    nickname,
  })
  return res.data
}
// 다른 유저 정보 조회
export const getUserProfile = async ({ memberId }: { memberId: UserModel['memberId'] }) => {
  const res = await ax.get<StandardResponse<UserModel>>(`/users/${memberId}/profile`)
  return res.data
}

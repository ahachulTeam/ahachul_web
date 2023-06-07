import { ax } from './axios'
import { StandardResponse } from '@/types/common'
import { UserModel, VerifyNicknameModel } from '@/types/user'

const userAPI = {
  // 내 정보 조회
  getMyProfile: async (): Promise<StandardResponse<UserModel>> => {
    const res = await ax.get('/members')
    return res.data
  },
  // 내 정보 수정
  updateMyProfile: async ({ nickname }: { nickname: UserModel['nickname'] }): Promise<StandardResponse<UserModel>> => {
    const res = await ax.patch('/members', { nickname })
    return res.data
  },
  // 사용자 닉네임 중복 체크
  verifyMyNickname: async ({
    nickname,
  }: {
    nickname: UserModel['nickname']
  }): Promise<StandardResponse<VerifyNicknameModel>> => {
    const res = await ax.post('/members/check-nickname', {
      nickname,
    })
    return res.data
  },
  // 다른 유저 정보 조회
  getUserProfile: async ({ memberId }: { memberId: UserModel['memberId'] }): Promise<StandardResponse<UserModel>> => {
    const res = await ax.get(`/users/${memberId}/profile`)
    return res.data
  },
}

export default userAPI

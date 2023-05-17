import { useMutation } from '@tanstack/react-query'

import { userAPI } from '@/apis'
import { UserModel } from '@/types/user'

export const useVerifyNickname = () =>
  useMutation({
    mutationFn: ({ nickname }: { nickname: UserModel['nickname'] }) => userAPI.verifyMyNickname({ nickname }),
  })

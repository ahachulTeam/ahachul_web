import { useMutation } from '@tanstack/react-query'

import { verifyMyNickname } from '@/apis/users'
import { UserModel } from '@/types/user'

export const useVerifyNickname = () =>
  useMutation({
    mutationFn: ({ nickname }: { nickname: UserModel['nickname'] }) => verifyMyNickname({ nickname }),
  })

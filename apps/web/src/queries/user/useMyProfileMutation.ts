import { useMutation } from '@tanstack/react-query'

import userAPI from '@/apis/users'
import { UserModel } from '@/types/user'

const useMyProfileMutation = () =>
  useMutation({
    mutationFn: ({ nickname }: { nickname: UserModel['nickname'] }) => userAPI.updateMyProfile({ nickname }),
  })

export default useMyProfileMutation

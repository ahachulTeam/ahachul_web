import { useMutation } from '@tanstack/react-query'

import userAPI from '@/apis/users'
import { useAuth } from '@/context'
import { UserModel } from '@/types/user'

const useMyProfileMutation = () => {
  const { auth } = useAuth()

  return useMutation({
    mutationFn: ({ nickname }: { nickname: UserModel['nickname'] }) => userAPI.updateMyProfile({ nickname }),
    onSuccess: res => {
      auth.changeProfile(res.result.nickname)
    },
  })
}

export default useMyProfileMutation

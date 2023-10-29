import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import * as authApi from '@/apis/auth'
import { PATH } from '@/constants'
import { useAuth } from '@/context'
import * as type from '@/types/auth'

export const useLoginMutation = () => {
  const router = useRouter()

  const { auth } = useAuth()

  return useMutation({
    mutationFn: (providers: type.APILoginUserProviders) => authApi.login(providers),
    onSuccess: ({ result }) => {
      auth.signIn(result)

      if (result.isNeedAdditionalUserInfo) {
        router.replace(PATH.NICKNAME)
      } else {
        router.push(PATH.HOME)
      }
    },
  })
}

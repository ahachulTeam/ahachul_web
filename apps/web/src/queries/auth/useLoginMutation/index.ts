import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { login } from '@/apis/auth'
import { PATH } from '@/constants'
import { useAuth } from '@/context'
import { APILoginUserProviders } from '@/types/auth'

const useLoginMutation = () => {
  const router = useRouter()

  const { auth } = useAuth()

  return useMutation({
    mutationFn: (providers: APILoginUserProviders) => login(providers),
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

export default useLoginMutation

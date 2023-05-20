import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import authAPI from '@/apis/auth'
import { useAuth } from '@/context'
import { APILoginUserProviders } from '@/types/auth'

const useLoginMutation = () => {
  const router = useRouter()

  const { auth } = useAuth()

  return useMutation({
    mutationFn: (providers: APILoginUserProviders) => authAPI.login(providers),
    onSuccess: ({ result }) => {
      if (result.isNeedAdditionalUserInfo) {
        router.replace('/onboarding/nickname')
      } else {
        auth.signIn(result)
        router.push('/my-page')
      }
    },
  })
}

export default useLoginMutation

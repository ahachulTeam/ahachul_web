import { useMutation, useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import * as authApi from '@/apis/auth'
import { PATH } from '@/constants'
import { useAuth } from '@/context'
import * as type from '@/types/auth'

export const useGetOauthUrls = (enabled = false) => {
  const queries = ['KAKAO', 'GOOGLE'].map(item => ({
    queryKey: ['auth', 'oAuthUrl', item],
    queryFn: () => authApi.getOAuthRedirectUrl(item as 'KAKAO' | 'GOOGLE'),
    enabled: enabled || false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  }))

  const results = useQueries({
    queries,
  })

  const successClientData = useMemo(() => {
    const urls = results?.map(item => ({
      redirectUrl: item?.data?.result?.redirectUrl,
    }))
    const [kakao, google] = urls

    return {
      kakao: kakao?.redirectUrl as string,
      google: google?.redirectUrl as string,
    }
  }, [results])

  return successClientData
}

export const useLoginMutation = () => {
  const router = useRouter()

  const { auth } = useAuth()

  return useMutation({
    mutationFn: (providers: type.APILoginUserProviders) => authApi.login(providers),
    onSuccess: ({ result }) => {
      auth.signIn(result)

      if (result.isNeedAdditionalUserInfo) {
        router.replace(PATH.SETTING_NICKNAME)
      } else {
        router.push(PATH.HOME)
      }
    },
  })
}

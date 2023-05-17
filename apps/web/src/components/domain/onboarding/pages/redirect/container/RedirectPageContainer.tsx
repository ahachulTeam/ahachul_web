import { useRouter } from 'next/router'
import { useEffect } from 'react'

import * as S from './styled'

import useLoginMutation from '@/queries/auth/useLoginMutation'
import { APILoginUserProviders } from '@/types/auth'

function RedirectPageContainer() {
  const { query } = useRouter()
  const providerCode = query?.code
  const providerType = query?.type

  const { mutate: mutateLogin } = useLoginMutation()

  useEffect(() => {
    if (!!providerCode && !!providerType) {
      mutateLogin({
        providerCode,
        providerType,
      } as APILoginUserProviders)
    }
  }, [query])

  return <S.Redirect />
}

export default RedirectPageContainer

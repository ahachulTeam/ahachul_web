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
    if (Boolean(providerCode) && Boolean(providerType)) {
      mutateLogin({
        providerCode,
        providerType,
      } as APILoginUserProviders)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return <S.Redirect />
}

export default RedirectPageContainer

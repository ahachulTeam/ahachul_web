import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useLoginMutation } from '@/services'
import { APILoginUserProviders } from '@/types/auth'

function RedirectForLoginScreen() {
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

  return <Redirect />
}

const Redirect = styled.div`
  ${({ theme }) => css`
    background-image: url('/illust/onboding/_3.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 530px;
    height: 324px;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    animation: ${theme.animations.slideUpAndFade} 1000ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  `}
`

export default RedirectForLoginScreen

import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Redirect = styled.div`
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

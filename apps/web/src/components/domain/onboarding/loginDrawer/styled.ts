import { css } from '@emotion/react'
import styled from '@emotion/styled'
import NextLink from 'next/link'

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
`

export const Link = styled(NextLink)`
  width: 100%;
`

export const KakaoBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.medium14};
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
    border-radius: 70px;
    color: #191600;
    background-color: #fee102;

    & > img {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
    }
  `}
`

export const GoogleBtn = styled(KakaoBtn)`
  ${({ theme }) => css`
    border: 1px solid #7d839830;
    background-color: ${theme.colors.white};
  `}
`

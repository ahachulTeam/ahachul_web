import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
    margin-bottom: 15px;

    & > b {
      color: ${theme.colors.primary};
    }
  `}
`

export const CommentInput = styled.input`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    box-sizing: border-box;
    height: 44px;
    width: 100%;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 110px;
    padding-left: 25px;

    &::placeholder {
      color: ${theme.colors.gray_40};
    }
    &[aria-invalid='true'] {
      border-color: ${theme.colors.red_10};
    }
  `}
`

export const InputCoverBtn = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
`

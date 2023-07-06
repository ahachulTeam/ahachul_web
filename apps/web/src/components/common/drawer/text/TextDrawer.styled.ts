import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.section`
  width: 100%;
  min-height: 100%;
`

export const DrawerInput = styled.textarea`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    border: none;
    outline: none;

    &::placeholder {
      word-break: break-all;
      word-wrap: break-word;
    }
  `}
`

export const DrawerHeaderBox = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

export const IconBtn = styled.button`
  all: unset;
  cursor: pointer;
`

export const HeadTitle = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
  `}
`

export const SubmitBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    color: ${theme.colors.black};

    &:disabled {
      color: #d1d1d1;
    }

    &::placeholder {
      color: #d1d1d1;
    }
  `}
`

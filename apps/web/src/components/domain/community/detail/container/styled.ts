import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.article`
  width: 100%;
`

export const ContentSection = styled.section`
  padding: 30px 16px 0 16px;
`

export const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 24px 16px;
`

export const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`

export const ContentsReactBtnGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    width: 100%;
    padding: 15px 0;

    & > button {
      width: 100%;
      border-radius: 10px;
      color: ${theme.colors.gray_65};
      font-weight: 400;
    }
  `}
`

export const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: ${theme.colors.black};
`

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`

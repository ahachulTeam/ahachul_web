import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.section`
  width: 100%;
`

export const ListSection = styled.div`
  padding: 20px;
`

export const TopFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 13px 20px;
`

export const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: ${theme.colors.black};
`

export const dividerCss = (theme: Theme) => css`
  min-width: 100%;
  height: 8px;
  background-color: ${theme.colors.gray_10};
`

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`

export const customBorderBottomCss = css`
  border-bottom: 0.5px solid #e3e3e3;
`

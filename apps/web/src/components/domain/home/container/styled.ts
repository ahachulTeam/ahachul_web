import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.article`
  width: 100%;
`

export const SubwayInfoSection = styled.section`
  padding: 20px 16px;
`

export const NewsSection = styled.section`
  padding: 20px 0;
  max-width: 100%;
  overflow: hidden;
`

export const CommunitySection = styled.section`
  padding: 20px 16px;

  & > div:first-of-type {
    position: relative;
    margin-bottom: 18px;

    & > a {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);

      & > svg {
        transform: rotate(180deg);
        & > path {
          stroke: #aaaaaa;
        }
      }
    }
  }
`

export const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`

export const bannerSectionTitle = css`
  padding: 0 16px;
  margin-bottom: 18px;
`

export const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: #aaaaaa;

  & > b {
    color: ${theme.colors.black};
  }
`

import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'

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

export const Community = styled.ul`
  display: flex;
  flex-direction: column;

  & > li:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }
`

export const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: #aaaaaa;

  & > b {
    color: ${theme.colors.black};
  }
`

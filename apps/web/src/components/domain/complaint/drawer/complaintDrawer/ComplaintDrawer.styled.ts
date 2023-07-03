import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.section`
  width: 100%;
  min-height: 100%;
`

export const SectionTitle = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32px;
    margin-bottom: 24px;
  `}
`

export const 지하철정보 = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 10px;

    & > span {
      ${theme.fonts.bold14};

      & > b {
        color: #fe8a39;
      }
    }

    & > p {
      ${theme.fonts.regular12};
    }
  `}
`

export const 진짜콘텐츠 = styled.article`
  border-top: 1px solid #e7e7e7;
`

export const fixedBottomCss = css`
  position: fixed;
  bottom: 25px;
  right: 16px;

  & > button {
    border-radius: 60px;
    width: 148px;
  }
`

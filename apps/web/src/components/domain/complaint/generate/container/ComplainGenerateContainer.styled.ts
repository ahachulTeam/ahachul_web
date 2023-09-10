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
    padding: 12px 16px;
    margin-top: 16px;

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

export const StickyArea = styled.div<{ $isOpenNavigationBar: boolean }>`
  ${({ theme, $isOpenNavigationBar }) => css`
    position: fixed;
    left: 0;
    bottom: ${$isOpenNavigationBar ? '59px' : 0};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 768px;
    border-top: 1px solid ${theme.colors.gray_25};
    padding: 14px 15px 25px 15px;
    background-color: ${theme.colors.white};
    transition: all 400ms cubic-bezier(0.43, 0.03, 0.15, 0.95);

    & > button {
      width: 100%;
    }

    @media only screen and (min-width: 480px) {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  `}
`

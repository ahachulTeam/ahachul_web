import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ColorBox = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  aspect-ratio: 0.8;
  overflow: hidden;
`

export const Color = styled.div<{ hex: string }>`
  ${({ hex }) => css`
    background-color: ${hex};
  `}
`

export const Desc = styled.dl`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 8px;

    & > dt {
      ${theme.fonts.regular12};
      font-weight: 500;
      color: ${theme.colors.black};
    }

    & > dd {
      ${theme.fonts.regular12};
      color: ${theme.colors.gray_55};
    }
  `}
`

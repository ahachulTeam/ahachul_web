import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Emergency = styled.div`
  margin-bottom: 25px;
`

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.bold16};
    margin-bottom: 12px;
  `}
`

export const EmergencyCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 15px;
  row-gap: 18px;
  width: 100%;

  & > li:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
`

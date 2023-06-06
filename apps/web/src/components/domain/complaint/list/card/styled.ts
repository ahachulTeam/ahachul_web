import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComplaintCardVariant } from '@/types/variants'

interface ComplaintCardProps {
  variant: ComplaintCardVariant
}

export const ComplaintCard = styled.article<ComplaintCardProps>`
  ${({ theme, variant }) => css`
    position: relative;
    width: 100%;
    min-height: 114px;
    padding: 10px 16px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;

    ${variant === 'primary' && varaiants.primary(theme)};
    ${variant === 'secondary' && varaiants.secondary(theme)};
    ${variant === 'inactive' && varaiants.inactive(theme)};

    & > h4 {
      ${theme.fonts.bold18};
      margin-bottom: 4px;
    }

    & > pre {
      ${theme.fonts.regular12};
      font-family: Pretendard;
    }
  `}
`

const varaiants = {
  primary: (theme: Theme) => css`
    border: none;
    background-color: ${theme.colors.secondary};
  `,
  secondary: (theme: Theme) => css`
    border: 1px solid ${theme.colors.gray_19_05};
    background-color: ${theme.colors.white};
  `,
  inactive: (theme: Theme) => css`
    border: none;
    background-color: ${theme.colors.gray_10};
  `,
}
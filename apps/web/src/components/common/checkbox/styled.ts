import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Checkbox = styled.div`
  ${({ theme }) => css`
    ${theme.checkbox.primary};

    &:has(input:checked) {
      border: 1px solid ${theme.colors.primary};
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        border: 1px solid ${theme.colors.primary_hover};

        & > input[type='checkbox'] + label {
          &::before {
            content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
            vertical-algin: center;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid ${theme.colors.primary_hover};
            border-radius: 50%;
            font-size: 2.3rem;
            background-color: ${theme.colors.primary_hover};
          }
        }
      }
    }
  `}
`

import { theme } from '@ahhachul/design-system'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface CheckboxProps {
  variant: 'primary' | 'ghost'
}

const variants = {
  primary: () => css`
    height: 44px;
    border: 1px solid ${theme.colors.gray_30};
    border-radius: 110px;
    padding: 0 16px;
    transition: border 0.3s ease-in-out;

    & > label {
      ${theme.fonts.medium16};
      column-gap: 12px;

      @media (hover: hover) {
        &:hover::before {
          border-color: ${theme.colors.primary_hover};
        }
      }
    }

    &:has(input:checked) {
      border: 1px solid ${theme.colors.primary};
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        border: 1px solid ${theme.colors.primary_hover};
      }
    }
  `,
  ghost: () => css`
    max-width: max-content;

    & > label {
      ${theme.fonts.medium14};
      column-gap: 10px;
      line-height: 2.0714;
    }
  `,
}

export const Checkbox = styled.div<CheckboxProps>`
  ${({ variant }) => css`
    ${variant === 'primary' && variants.primary()};
    ${variant === 'ghost' && variants.ghost()};
    /* ${variants[variant]()}; */
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    & > input[type='checkbox'] {
      ${theme.a11y.visuallyHidden};
    }

    & > label {
      display: flex;
      align-items: center;
      min-width: 100%;
      min-height: 100%;
      color: ${theme.colors.gray_80};
      user-select: none;
      cursor: pointer;

      &::before {
        content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
        vertical-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid ${theme.colors.gray_30};
        background-color: ${theme.colors.gray_30};
        font-size: 2.1rem;
        transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
      }

      & > span {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    & > input[type='checkbox']:checked + label {
      &::before {
        content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
        vertical-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${theme.colors.primary};
        border-radius: 50%;
        font-size: 2.1rem;
        background-color: ${theme.colors.primary};
      }
    }

    @media (hover: hover) {
      &:not(:disabled):hover {
        & > input[type='checkbox'] + label {
          &::before {
            content: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 7.32091L2.58174 6.23088L6.64065 10.3209L13.4087 3.50098L14.5 4.59101L6.64065 12.501L1.5 7.32091Z' fill='%23fff' /%3E%3C/svg%3E%0A");
            vertical-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid ${theme.colors.primary_hover};
            border-radius: 50%;
            font-size: 2.1rem;
            background-color: ${theme.colors.primary_hover};
          }
        }
      }
    }
  `}
`

import { theme } from '@ahhachul/design-system'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import type { ButtonSize, ButtonVariant } from './Button'

interface ButtonProps {
  size: ButtonSize
  variant: ButtonVariant
}

export const Button = styled.button<ButtonProps>`
  ${({ size, variant }) => css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    min-width: max-content;
    ${size === 'xs' && varaiants.size.xs()}
    ${size === 'sm' && varaiants.size.sm()};
    ${size === 'smd' && varaiants.size.smd()};
    ${size === 'md' && varaiants.size.md()};
    ${size === 'lg' && varaiants.size.lg()};
    ${variant === 'primary' && varaiants.variant.primary()};
    ${variant === 'secondary' && varaiants.variant.secondary()};
    ${variant === 'outline' && varaiants.variant.outline()};
    ${variant === 'ghost' && varaiants.variant.ghost()};

    & > b {
      color: ${theme.colors.primary};
    }
  `}
`

const varaiants = {
  size: {
    xs: () => css`
      ${theme.fonts.regular12};
      height: 30px;
      border-radius: 65px;
      padding: 0 18px;
    `,
    sm: () => css`
      ${theme.fonts.regular14};
      height: 36px;
      border-radius: 10px;
      padding: 0 16px;
    `,
    smd: () => css`
      ${theme.fonts.medium14};
      height: 40px;
      border-radius: 10px;
      padding: 0 20px;
    `,
    md: () => css`
      ${theme.fonts.medium14};
      height: 44px;
      border-radius: 70px;
      padding: 0 20px;
    `,
    lg: () => css`
      ${theme.fonts.semibold16};
      height: 52px;
      border-radius: 10px;
      padding: 0 24px;
    `,
  },
  variant: {
    primary: () => css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      transition: all 0.3s ease-in-out;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${theme.colors.primary_hover};
        }
      }

      &:active {
        background-color: ${theme.colors.primary_active};
      }

      &:disabled {
        color: ${theme.colors.gray_30};
        background-color: ${theme.colors.gray_20};
      }
    `,
    secondary: () => css`
      color: ${theme.colors.primary};
      background-color: ${theme.colors.secondary};
      transition: all 0.3s ease-in-out;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${theme.colors.secondary_hover};
        }
      }

      &:active {
        background-color: ${theme.colors.secondary_active};
      }

      &:disabled {
        background-color: ${theme.colors.gray_20};
        opacity: 0.4;
      }
    `,
    icon: () => css`
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid ${theme.colors.gray_20};
      background-color: ${theme.colors.white};

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${theme.colors.gray_10};
        }
      }
    `,
    ghost: () => css`
      border-radius: 10px;
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${theme.colors.gray_10};
        }
      }
    `,
    outline: () => css`
      border-radius: 10px;
      border: 1px solid ${theme.colors.gray_33};
      color: ${theme.colors.gray_65};
      background-color: ${theme.colors.white};
      transition: all 0.3s ease-in-out;

      @media (hover: hover) {
        &:not(:disabled):hover {
          background-color: ${theme.colors.gray_10};
        }
      }
    `,
    link: () => css`
      ${theme.fonts.regular14};
      position: relative;
      height: max-content;
      color: ${theme.colors.gray_60};
      transition: 0.3s;

      &::before {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${theme.colors.gray_60};
        transition: 0.3s;
      }

      @media (hover: hover) {
        &:not(:disabled):hover {
          color: ${theme.colors.black};

          &::before {
            background-color: ${theme.colors.black};
          }
        }
      }
    `,
  },
}

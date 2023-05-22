import { css, type Theme } from '@emotion/react'
import styled from '@emotion/styled'

import type { ButtonSize, ButtonVariant } from './Button'

interface ButtonProps {
  size: ButtonSize
  variant: ButtonVariant
}

export const Button = styled.button<ButtonProps>`
  ${({ theme, size, variant }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size === 'xs' && varaiants.size.xs(theme)}
    ${size === 'sm' && varaiants.size.sm(theme)};
    ${size === 'smd' && varaiants.size.smd(theme)};
    ${size === 'md' && varaiants.size.md(theme)};
    ${size === 'lg' && varaiants.size.lg(theme)};
    ${variant === 'primary' && varaiants.variant.primary(theme)};
    ${variant === 'secondary' && varaiants.variant.secondary(theme)};
  `}
`

const varaiants = {
  size: {
    xs: (theme: Theme) => css`
      ${theme.fonts.regular14};
      height: 32px;
      border-radius: 10px;
      padding: 0 12px;
    `,
    sm: (theme: Theme) => css`
      ${theme.fonts.regular14};
      height: 36px;
      border-radius: 10px;
      padding: 0 16px;
    `,
    smd: (theme: Theme) => css`
      ${theme.fonts.medium14};
      height: 40px;
      border-radius: 10px;
      padding: 0 20px;
    `,
    md: (theme: Theme) => css`
      ${theme.fonts.medium14};
      height: 44px;
      border-radius: 70px;
      padding: 0 20px;
    `,
    lg: (theme: Theme) => css`
      ${theme.fonts.semibold16};
      height: 52px;
      border-radius: 10px;
      padding: 0 24px;
    `,
  },
  variant: {
    primary: (theme: Theme) => css`
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
    secondary: (theme: Theme) => css`
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
    icon: (theme: Theme) => css`
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
    ghost: (theme: Theme) => css`
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};

      &:disabled {
        color: ${theme.colors.gray_40};
      }
    `,
    outline: (theme: Theme) => css`
      color: ${theme.colors.gray_60};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.gray_33};
      border-radius: 10px;
    `,
    link: (theme: Theme) => css`
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

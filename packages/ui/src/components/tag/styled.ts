import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'

import { TagVariant } from './type'

interface TagBtnProps {
  variant: TagVariant
}

export const Tag = styled.button<TagBtnProps>`
  ${({ theme, variant }) => css`
    ${theme.fonts.regular12};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 18px;
    border-radius: 135px;
    transition: 0.3s;

    ${variant === 'primary' && primaryTag(theme)};
    ${variant === 'outline' && outlineTag(theme)};
    ${variant === 'ghost' && ghostTag(theme)};
    ${variant === 'greyBackgroundOutline' && greyBackgroundOutlineTag(theme)};
    /* 
    &:disabled {
      color: ${theme.colors.gray_55};
      background-color: ${theme.colors.gray_18};
    } */

    & > span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`

const primaryTag = (theme: Theme) => css`
  height: 30px;
  border-radius: 135px;
  color: ${theme.colors.primary};
  background-color: ${theme.colors.secondary};

  @media (hover: hover) {
    &:not(:disabled):hover {
      color: ${theme.colors.primary_hover};
      background-color: ${theme.colors.secondary_hover};
    }
  }
`

const outlineTag = (theme: Theme) => css`
  height: 30px;
  padding: 0 16px;
  border: 1px solid ${theme.colors.gray_25};
  background-color: ${theme.colors.white};

  @media (hover: hover) {
    &:not(:disabled):hover {
      background-color: ${theme.colors.gray_20};
    }
  }
`

const ghostTag = (theme: Theme) => css`
  height: 28px;

  @media (hover: hover) {
    &:not(:disabled):hover {
      color: ${theme.colors.black};

      & > svg {
        fill: ${theme.colors.gray_80};
      }
    }
  }
`

const greyBackgroundOutlineTag = (theme: Theme) => css`
  height: 30px;
  border-radius: 135px;
  color: ${theme.colors.gray_55};
  background-color: ${theme.colors.gray_18};
`

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

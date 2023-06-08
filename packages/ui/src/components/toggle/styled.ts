import { theme } from '@ahhachul/design-system'

import styled from '@emotion/styled'
import * as Tabs from '@radix-ui/react-tabs'

export const ToggleRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 300px;
`

export const ToggleList = styled(Tabs.List)`
  position: relative;
  flex-shrink: 0;
  display: flex;
  border-radius: 40px;
  background-color: ${theme.colors.gray_20};

  &::before {
    content: '';
    position: absolute;
    width: 50%;
    background-color: ${theme.colors.primary};
    height: 100%;
    top: 0;
    left: 0;
    transition: all 250ms ease-in-out;
    border-radius: 40px;
  }

  &:has(> button:first-of-type[data-state='active'])::before {
    transform: translateX(0);
  }

  &:has(> button:last-child[data-state='active'])::before {
    transform: translateX(100%);
  }
`

export const ToggleTrigger = styled(Tabs.Trigger)`
  ${theme.fonts.medium14};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 36px;
  padding: 0 20px;
  color: ${theme.colors.gray_40};
  user-select: none;
  transition: all 0.3s ease-in-out;
  z-index: 2;

  &:first-of-type {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }

  &:last-child {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }

  &[data-state='active'] {
    color: ${theme.colors.white};
  }
`

export const ToggleContent = styled(Tabs.Content)`
  flex-grow: 1;
  padding: 20px;
  background-color: ${theme.colors.white};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  outline: none;
`

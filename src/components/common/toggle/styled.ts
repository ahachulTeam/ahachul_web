import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";

export const ToggleRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const ToggleList = styled(Tabs.List)`
  ${({ theme }) => css`
    position: relative;
    flex-shrink: 0;
    display: flex;
    border-radius: 40px;
    background-color: ${theme.colors.gray_20};

    &::before {
      content: "";
      position: absolute;
      width: 50%;
      background-color: ${theme.colors.primary};
      height: 100%;
      top: 0;
      left: 0;
      transition: all 250ms ease-in-out;
      border-radius: 40px;
    }

    &:has(> button:first-child[data-state="active"])::before {
      transform: translateX(0);
    }

    &:has(> button:last-child[data-state="active"])::before {
      transform: translateX(100%);
    }
  `}
`;

export const ToggleTrigger = styled(Tabs.Trigger)`
  ${({ theme }) => css`
    ${theme.toggle.primary};
  `}
`;

export const ToggleContent = styled(Tabs.Content)`
  ${({ theme }) => css`
    flex-grow: 1;
    padding: 20px;
    background-color: ${theme.colors.white};
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    outline: none;
  `}
`;

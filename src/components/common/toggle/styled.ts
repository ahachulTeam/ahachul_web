import * as Tabs from "@radix-ui/react-tabs";
import { css, styled } from "styled-components";

export const ToggleRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const ToggleList = styled(Tabs.List)`
  flex-shrink: 0;
  display: flex;
`;

export const ToggleTrigger = styled(Tabs.Trigger)`
  ${({ theme }) => css`
    ${theme.tab.navMenu};
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

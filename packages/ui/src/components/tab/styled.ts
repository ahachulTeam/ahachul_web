import { theme } from '@ahhachul/design-system'

import styled from '@emotion/styled'

export const StyledTab = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(97.5px, 1fr));
`

export const TabBtn = styled.button`
  ${theme.fonts.medium16};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 26px;
  padding: 7px 0;
  color: ${theme.colors.gray_50};

  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    opacity: 0;
    width: calc(100% - 24px);
    height: 3px;
    border-radius: 12px;
    background: ${theme.colors.primary};
    transition: all 0.3s ease-in-out;
  }

  &[aria-selected='true'] {
    ${theme.fonts.semibold16};
    color: ${theme.colors.primary};

    &::after {
      opacity: 1;
    }
  }

  &[aria-selected='false'] {
    :hover {
      ${theme.fonts.semibold16};
      color: ${theme.colors.primary};
    }
  }

  @media ${theme.breakPoint.device.tablet} {
    &::after {
      width: 100%;
    }
  }
`

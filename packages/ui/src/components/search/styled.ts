import { theme } from '@ahhachul/design-system'

import styled from '@emotion/styled'

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;

  & > input {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 95px;
    padding: 2px 16px;
    padding-right: 74px;
    color: ${theme.colors.black};
    background-color: ${theme.colors.gray_15};
    transition: 0.3s;

    &::placeholder {
      color: ${theme.colors.gray_50};
    }

    &:focus {
      box-shadow: 0 0 0 1px inset ${theme.colors.primary};
    }

    @media (hover: hover) {
      &:not(:disabled):not(:focus):hover {
        box-shadow: 0 0 0 1px inset ${theme.colors.primary};
      }
    }
  }
`

export const RemoveKeywordBtn = styled.button`
  position: absolute;
  right: 39px;
  fill: ${theme.colors.gray_50};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  &[data-isshow='true'] {
    opacity: 1;
    pointer-events: unset;
  }

  & > svg > circle {
    fill: #c0c0c0;
  }
`

export const SearchBtn = styled.button`
  position: absolute;
  right: 13px;
  fill: ${theme.colors.gray_50};
`

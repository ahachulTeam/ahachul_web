import { css } from '@emotion/react'
import styled from '@emotion/styled'

const SEARCH_ICON_POSITION = '13.5px'

export const SearchInput = styled.form`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;

    & > input {
      ${theme.input.search};
    }
  `}
`

export const IconBtn = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 50%;
    right: ${SEARCH_ICON_POSITION};
    fill: ${theme.colors.gray_50};
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 100%;
  `}
`

export const closeIconStyle = css`
  right: calc(${SEARCH_ICON_POSITION} + 26.5px);
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

import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'

export const Item = styled.li`
  & > article > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
    padding: 15px 0;
  }
`

export const Flex = styled.div`
  ${({ theme }) => css`
    position: relative;
    flex: 1 0;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
    height: 100%;

    & > h4 {
      ${theme.fonts.bold14};
      color: ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular12};
      color: #272727;
      font-weight: 300;
    }
  `}
`

export const Box = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: flex;
    width: max-content;
    padding-top: 4px;

    & > span:not(:last-of-type) {
      position: relative;
      display: inline-block;
      margin-right: 12px;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -6px;
        transform: translateY(-50%);
        width: 1px;
        height: 10px;
        background-color: #c3c3c3;
      }
    }
  `}
`

export const Thumbnail = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 75px;
    aspect-ratio: 75 / 69;
    background-color: #f4f4f4;
    box-shadow: 0 0 0 1px #f4f4f4 inset;
    border-radius: 5px;
    background-color: ${theme.colors.gray_18};
    overflow: hidden;
  `}
`

export const CommentBox = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    column-gap: 4px;

    & > span {
      ${theme.fonts.regular12};
      color: ${theme.colors.gray_35};
    }

    & > svg {
      fill: ${theme.colors.gray_35};
      transition: all 0.3s ease-in-out;
    }

    @media (hover: hover) {
      &:hover {
        & > span {
          color: ${theme.colors.primary};
        }

        & > svg {
          fill: ${theme.colors.primary};
        }
      }
    }
  `}
`

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`

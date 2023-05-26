import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const CategoryList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
  overflow-x: overlay;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 15px;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const NoticeAlarmList = styled.ul`
  width: 100%;
`

export const Alarm = styled.li`
  cursor: pointer;

  &[aria-checked='true'] {
    background-color: #d0eeff;
  }

  & > article {
    width: 100%;
    padding: 17px 15px 19px 15px;
  }
`
export const Nickname = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium16};
    margin-bottom: 8px;
    color: ${theme.colors.black};
  `}
`

export const Content = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    max-width: 74%;
    margin-bottom: 4px;
    color: ${theme.colors.black};
  `}
`

export const Flex = styled.span`
  display: flex;
`
export const Category = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    width: max-content;
    color: ${theme.colors.gray_45};
    margin-right: 2px;
  `}
`

export const Time = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    color: ${theme.colors.gray_45};
  `}
`

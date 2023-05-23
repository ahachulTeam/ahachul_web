import { css, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { type Variants } from 'framer-motion'
import { defaultEasing } from '@/constants/motions'

export const overlayCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.dim};
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const contentCss = (theme: Theme) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: ${theme.zIndex.modal};
  width: 100%;
  max-width: ${theme.size.layout.width};
  height: 100%;
  padding: 10px 20px;
  background-color: white;
`

export const searchDrawerVariants: Variants = {
  initial: {
    x: '10%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  animate: {
    x: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  exit: {
    x: '10%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
}

export const ModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 100%;
  margin-right: 12px;
`

export const SearchHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 45px;
  overflow: hidden;
`

export const SearchHistoryHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 14px;

    & > span {
      ${theme.fonts.bold16};
      color: ${theme.colors.black};
    }

    & > button {
      ${theme.fonts.medium14};
      color: ${theme.colors.gray_40};
    }
  `}
`

export const SearchHistoryTagList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
  width: 100%;
  overflow-x: overlay;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Hashtag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const HashtagHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 14px;

    & > span {
      ${theme.fonts.bold16};
      color: ${theme.colors.black};
      margin-right: 6px;
    }

    & > p {
      ${theme.fonts.regular11};
      color: ${theme.colors.gray_35};
    }
  `}
`

export const HastTagList = styled.ul`
  display: grid;
  width: 100%;
`

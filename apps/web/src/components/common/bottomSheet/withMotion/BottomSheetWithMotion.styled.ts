import { Theme, css } from '@emotion/react'
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

  /* TODO: 디자인에 따라 변경 필요 */
  background-color: rgb(0 0 0 / 30%);
`

export const contentCss = (theme: Theme) => css`
  position: relative;
  z-index: ${theme.zIndex.modal};
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 768px;
  margin: 0 auto;

  min-height: 68.75%;
  max-height: 68.75%;
  padding: 8px 0 119.5px 0;

  background-color: #fff;
  border-radius: 24px 24px 0 0;

  overflow: hidden;

  @supports not (overflow: overlay) {
    overflow: auto;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  :hover {
    overflow-y: overlay;
  }
`

export const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
}

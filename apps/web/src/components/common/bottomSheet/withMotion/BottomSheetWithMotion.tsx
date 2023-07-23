import { Interpolation, type Theme } from '@emotion/react'
import { m } from 'framer-motion'
import { type ComponentProps, type MouseEventHandler } from 'react'
import { MotionPortal } from '../../portal'
import * as S from './BottomSheetWithMotion.styled'
import { defaultFadeInVariants } from '@/constants/motions'
import { useScrollLock } from '@/hooks'

interface Props extends ComponentProps<typeof MotionPortal> {
  onClickOutside?: VoidFunction
  overrideCss?: Interpolation<Theme>
}

export default function BottomSheet({ onClickOutside, isMounted, overrideCss, children, mode }: Props) {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = e => {
    if (e.target !== e.currentTarget) {
      return
    }
    if (onClickOutside) {
      onClickOutside()
    }
  }

  useScrollLock({ lock: isMounted })

  return (
    <MotionPortal isMounted={isMounted} mode={mode}>
      <m.div
        onClick={onClickOutsideDefault}
        css={S.overlayCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <m.div css={[S.contentCss, overrideCss]} variants={S.bottomSheetVariants}>
          {children}
        </m.div>
      </m.div>
    </MotionPortal>
  )
}

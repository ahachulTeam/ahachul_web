/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, Interpolation, useTheme, type Theme } from '@emotion/react'
import { m } from 'framer-motion'
import { ReactNode, type ComponentProps, type MouseEvent, type ReactElement } from 'react'

import { MotionPortal } from '../portal'
import { CancelButton, ConfirmButton } from './DialogButton'
import { Description, Title } from './DialogText'
import { defaultFadeInUpVariants, defaultFadeInVariants } from '@/constants/motions'
import { useScrollLock } from '@/hooks/scrolls/useScrollLock'

interface Props {
  isMounted?: boolean
  /**
   * 제목을 `string` 혹은 `ReactElement`로 전달해주세요.
   */
  title?: string | ReactElement
  /**
   * 설명을 `string` 혹은 `ReactElement`로 전달해주세요.
   */
  description?: string | ReactElement
  /**
   * 좌측 취소 버튼을 `ReactElement`로 전달해주세요.
   */
  cancelButton?: ReactElement
  /**
   * 우측 확인 버튼을 `ReactElement`로 전달해주세요.
   */
  confirmButton?: ReactElement
  /**
   * blur가 존재할지 안할지 boolean 값으로 전달해주세요.
   */
  hasBlur?: boolean
  /**
   * 아이콘이 존재한다면 아이콘을 전달해주세요.
   */
  centerIcon?: ReactNode
  /**
   * overrideCss
   */
  overrideCss?: Interpolation<Theme>
  /**
   * 외부영역 클릭시 호출될 함수
   */
  onClickOutside?: VoidFunction
}

/**
 *
 * @param isMounted 열림/닫힘 상태
 * @param mode AnimatePresence mode
 * @param onClickOutside 외부영역 클릭시 호출될 함수
 * @param title 제목을 `string` 혹은 `ReactElement`로 전달해주세요. Dialog.Title을 사용하세요.
 * @param description 설명을 `string` 혹은 `ReactElement`로 전달해주세요. Dialog.Description을 사용하세요.
 * @param cancelButton 좌측 취소 버튼을 `ReactElement`로 전달해주세요. Dialog.CancelButton을 사용하세요.
 * @param confirmButton 우측 확인 버튼을 `ReactElement`로 전달해주세요. Dialog.ConfirmButton을 사용하세요.
 */
const Dialog = ({
  isMounted,
  mode,
  hasBlur = false,
  overrideCss,
  onClickOutside,
  ...props
}: Props & ComponentProps<typeof MotionPortal>) => {
  useScrollLock({ lock: Boolean(isMounted) })

  return (
    <MotionPortal isMounted={Boolean(isMounted)} mode={mode}>
      <div css={[dialogPositionCss, overrideCss]}>
        <DialogBlur hasBlur={hasBlur} onClickOutside={onClickOutside} />
        <DialogContent {...props} />
      </div>
    </MotionPortal>
  )
}

const dialogPositionCss = css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding-bottom: 12px;
`

const DialogBlur = ({ hasBlur, onClickOutside }: Pick<Props, 'hasBlur' | 'onClickOutside'>) => {
  const onClickOutsideDefault = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return
    }
    if (onClickOutside) {
      onClickOutside()
    }
  }

  const theme = useTheme()

  return (
    <m.div
      onClick={onClickOutsideDefault}
      css={blurCss(theme, Boolean(hasBlur))}
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  )
}

const blurCss = (theme: Theme, hasBlur: boolean) => css`
  position: fixed;
  z-index: 2500;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  backdrop-filter: ${hasBlur ? 'blur(1.5px)' : 'unset'};
`

const DialogContent = ({
  title,
  description,
  centerIcon,
  cancelButton,
  confirmButton,
}: Omit<Props, 'onClickOutside'>) => {
  return (
    <m.div css={containerCss} variants={defaultFadeInUpVariants} initial="initial" animate="animate" exit="exit">
      <div css={textWrapperCss(Boolean(description), Boolean(centerIcon))} className="dialog-text-contents">
        {title && (typeof title === 'string' ? <Title>{title}</Title> : title)}
        {description && (typeof description === 'string' ? <Description>{description}</Description> : description)}
        {centerIcon && centerIcon}
      </div>
      <div css={buttonWrapperCss} className="dialog-buttons">
        {cancelButton}
        {confirmButton}
      </div>
    </m.div>
  )
}

const containerCss = (theme: Theme) => css`
  position: fixed;
  z-index: 2700;

  display: flex;
  flex-direction: column;

  width: calc(100% - 32px);
  max-width: 400px;
  padding: 16px;
  margin: 0 auto;

  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 6px 16px 0px rgba(91, 91, 91, 0.25);
`

const textWrapperCss = (hasDescription: boolean, hasIcon: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${hasDescription && hasIcon ? '4px' : hasDescription && !hasIcon ? '12px' : '16px'};

  padding: 8px 20px;

  @media (min-width: 900px) {
    padding: 12px 16px;
  }
`

const buttonWrapperCss = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  width: 100%;
`

Dialog.Title = Title
Dialog.Description = Description
Dialog.CancelButton = CancelButton
Dialog.ConfirmButton = ConfirmButton

export default Dialog

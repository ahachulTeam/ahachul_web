/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, Interpolation, useTheme, type Theme } from '@emotion/react'
import { m } from 'framer-motion'
import { type ComponentProps, type MouseEvent, type ReactElement } from 'react'

import { MotionPortal } from '../portal'
import { CancelButton, ConfirmButton } from './DialogButton'
import { Description, Title } from './DialogText'
import { defaultFadeInUpVariants, defaultFadeInVariants } from '@/constants/motions'
import { useScrollLock } from '@/hooks'

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
  hasBlur = true,
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
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding-bottom: 24px;
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

  background-color: #d8e3ff99;
  backdrop-filter: ${hasBlur ? 'blur(1.5px)' : 'unset'};
`

const DialogContent = ({ title, description, cancelButton, confirmButton }: Omit<Props, 'onClickOutside'>) => {
  return (
    <m.div css={containerCss} variants={defaultFadeInUpVariants} initial="initial" animate="animate" exit="exit">
      <div css={textWrapperCss} className="dialog-text-contents">
        {title && (typeof title === 'string' ? <Title>{title}</Title> : title)}
        {description && (typeof description === 'string' ? <Description>{description}</Description> : description)}
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
  gap: 16px;

  width: calc(100% - 32px);
  max-width: 400px;
  padding: 16px;
  margin: 0 auto;

  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 40px #638fff4d;
`

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 8px 20px;

  @media (min-width: 900px) {
    padding: 12px 16px;
  }
`

const buttonWrapperCss = css`
  display: flex;
  gap: 9px;

  & > button:last-of-type {
    flex-grow: 1;
  }
`

Dialog.Title = Title
Dialog.Description = Description
Dialog.CancelButton = CancelButton
Dialog.ConfirmButton = ConfirmButton

export default Dialog

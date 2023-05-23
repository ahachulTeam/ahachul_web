import { useKeyTrap, useOnClickOutside } from '@ahhachul/lib'
import { ForwardedRef, forwardRef, PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { MotionPortal } from '../portal'
import * as S from './styled'
import { pretendard } from '@/assets/fonts/pretendard'
import { CloseIcon } from '@/assets/icons'
import { BOTTOM_SHEET_DURATION } from '@/constants'

interface BottomSheetProps {
  id?: string
  title: string
  isOpen: boolean
  isHeaderHidden?: boolean
  isTitleHidden?: boolean
  hasCloseBtn?: boolean
  className?: string
  closedCases?: boolean[]
  onClose: () => void
}

function BottomSheet(
  {
    children,
    title,
    isHeaderHidden = false,
    isTitleHidden = false,
    className,
    id,
    isOpen,
    hasCloseBtn = false,
    closedCases = [],
    onClose,
  }: PropsWithChildren<BottomSheetProps>,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setIsShow(false)
    setTimeout(() => {
      onClose()
    }, BOTTOM_SHEET_DURATION - 50)
  }, [onClose])

  useOnClickOutside(ref, handleClose)
  useKeyTrap(ref, handleClose)

  useEffect(() => {
    if (isOpen) {
      setIsShow(true)
    }
  }, [isOpen])

  useEffect(() => {
    const closing = closedCases.some(Boolean)
    if (closing) {
      handleClose()
    }
  }, [closedCases, handleClose])

  return (
    <MotionPortal isMounted={isOpen}>
      <S.Dim>
        <S.BottomSheet
          ref={ref}
          open={isOpen}
          data-status={isShow}
          aria-modal="true"
          tabIndex={-1}
          className={pretendard.className}
        >
          {!isHeaderHidden && (
            <S.Header>
              <h2>{title}</h2>
              {hasCloseBtn && (
                <S.CloseBtn type="button" aria-label="닫기 버튼" onClick={onClose}>
                  <CloseIcon />
                </S.CloseBtn>
              )}
            </S.Header>
          )}
          {!isTitleHidden && <h2 css={S.visuallyHidden}>{title}</h2>}
          <S.Content className={className}>{children}</S.Content>
        </S.BottomSheet>
      </S.Dim>
    </MotionPortal>
  )
}

export default forwardRef(BottomSheet)

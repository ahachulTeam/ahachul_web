import { ChangeEventHandler } from 'react'
import { useSwipeable } from 'react-swipeable'
import * as S from './TextDrawer.styled'
import { BottomSheetWithMotion } from '@/components'

interface TextDrawerProps {
  isOpen: boolean
  textValue: string
  onChangeTextValue: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onSubmitTextValue: () => void
  onClose: () => void
}

export default function TextDrawer({ isOpen, textValue, onChangeTextValue, onClose }: TextDrawerProps) {
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <BottomSheetWithMotion isMounted={isOpen} onClickOutside={onClose}>
      <S.Container {...swipeHandlers}>
        <input value={textValue} onChange={onChangeTextValue} />
      </S.Container>
    </BottomSheetWithMotion>
  )
}

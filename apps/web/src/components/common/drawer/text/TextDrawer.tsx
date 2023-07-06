import { ChangeEventHandler } from 'react'
import { useSwipeable } from 'react-swipeable'
import * as S from './TextDrawer.styled'
import { CloseIcon } from '@/assets/icons'
import { BottomSheetWithMotion } from '@/components'

interface TextDrawerProps {
  isOpen: boolean
  textValue: string
  onChangeTextValue: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onSubmitTextValue: () => void
  onClose: () => void
}

export default function TextDrawer({
  isOpen,
  textValue,
  onChangeTextValue,
  onSubmitTextValue,
  onClose,
}: TextDrawerProps) {
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <BottomSheetWithMotion isMounted={isOpen} onClickOutside={onClose}>
      <S.Container {...swipeHandlers}>
        <S.DrawerHeaderBox>
          <S.IconBtn>
            <CloseIcon />
          </S.IconBtn>
          <S.HeadTitle>댓글 쓰기</S.HeadTitle>
          <S.SubmitBtn disabled={!textValue} onClick={onSubmitTextValue}>
            작성
          </S.SubmitBtn>
        </S.DrawerHeaderBox>
        <S.DrawerInput
          value={textValue}
          placeholder={`주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다.`}
          onChange={onChangeTextValue}
        />
      </S.Container>
    </BottomSheetWithMotion>
  )
}

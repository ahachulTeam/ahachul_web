import { forwardRef, type ForwardedRef } from 'react'

import { useSwipeable } from 'react-swipeable'
import * as S from './styled'
import { BottomSheet } from '@/components/common'
import { SUBWAY_CALL_CENTER } from '@/constants/subway'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function CallCenterDrawer({ isOpen, onClose }: Props, ref: ForwardedRef<HTMLDialogElement>) {
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <BottomSheet ref={ref} title="콜센터 신고" isOpen={isOpen} onClose={onClose}>
      <S.ContentBox {...swipeHandlers}>
        <S.Title>저희가 더 준비하겠습니다!</S.Title>
        <S.ContentList>
          {SUBWAY_CALL_CENTER.map(item => {
            return (
              <S.Item key={item.id}>
                <span>{item.label}</span>
                <S.CallBtn href={`tel:${item.callNumber}`}>연결하기</S.CallBtn>
              </S.Item>
            )
          })}
        </S.ContentList>
      </S.ContentBox>
    </BottomSheet>
  )
}

export default forwardRef(CallCenterDrawer)

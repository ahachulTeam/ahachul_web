import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import * as S from './ComplaintDrawer.styled'
import { BottomSheetWithMotion } from '@/components/common'
import { ComplaintTargets } from '@/types/complaint'

const ComplaintContents = {
  facilities: '시설 · 환경민원',
  temperature: '온도조절',
  announcement: '안내방송',
  impediment: '질서저해',
  patient: '응급환자',
  sexual: '성추행',
  violence: '폭력',
} as const

interface ComplaintDrawerProps {
  isOpen: boolean
  targetSection: ComplaintTargets
  onClose: () => void
}

export default function ComplaintDrawer({ isOpen, targetSection, onClose }: ComplaintDrawerProps) {
  const [selectedTab, setSelectedTab] = useState(targetSection)

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  useEffect(() => setSelectedTab(targetSection || ''), [isOpen, targetSection])

  return (
    <BottomSheetWithMotion isMounted={isOpen} onClickOutside={onClose}>
      <S.Container {...swipeHandlers}>
        <S.SectionTitle>{ComplaintContents[selectedTab]}</S.SectionTitle>
        <S.지하철정보>
          <span>
            <b>3호선</b> 1192열차 311227호차
          </span>
          <p>대화행</p>
        </S.지하철정보>
        <S.진짜콘텐츠></S.진짜콘텐츠>
      </S.Container>
    </BottomSheetWithMotion>
  )
}

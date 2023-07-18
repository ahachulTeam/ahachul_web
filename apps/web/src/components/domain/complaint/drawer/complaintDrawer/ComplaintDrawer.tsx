import { Button } from '@ahhachul/ui'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import * as S from './ComplaintDrawer.styled'
import ComplaintDrawerContents, { ComplaintContentsKeys } from './contents'
import { BottomSheetWithMotion } from '@/components/common'
import { ComplaintTargets } from '@/types/complaint'

interface ComplaintDrawerProps {
  isOpen: boolean
  targetSection: ComplaintTargets
  onClose: () => void
}

export default function ComplaintDrawer({ isOpen, targetSection, onClose }: ComplaintDrawerProps) {
  const [selectedTab, setSelectedTab] = useState(targetSection)

  // const handleSubmitComplaintAction = params => {
  //   const reqParams = {
  //     targetSection,
  //     ...params,
  //   }
  // }

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  useEffect(() => setSelectedTab(targetSection || ''), [isOpen, targetSection])

  return (
    <BottomSheetWithMotion isMounted={isOpen} onClickOutside={onClose}>
      <S.Container {...swipeHandlers}>
        <S.SectionTitle>{ComplaintContentsKeys[selectedTab]}</S.SectionTitle>
        <S.지하철정보>
          <span>
            <b>3호선</b> 1192열차 311227호차
          </span>
          <p>대화행</p>
        </S.지하철정보>
        <S.진짜콘텐츠>
          <ComplaintDrawerContents selectedTab={selectedTab} />
        </S.진짜콘텐츠>
      </S.Container>
      <article css={S.fixedBottomCss}>
        <Button type="button" label="접수하기" size="md" variant="primary" />
      </article>
    </BottomSheetWithMotion>
  )
}

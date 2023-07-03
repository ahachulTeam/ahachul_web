import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { BottomSheetWithMotion } from '@/components/common'
import { ComplaintTargets } from '@/types/complaint'

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
      <div
        {...swipeHandlers}
        css={css`
          min-height: 400px;
        `}
      >
        {selectedTab}
      </div>
    </BottomSheetWithMotion>
  )
}

import { useRef, useEffect } from 'react'

import * as S from './IntersectionArea.styled'

interface IntersectionAreaProps {
  hasMore: boolean
  onImpression: () => void
}

export default function IntersectionArea({ hasMore, onImpression }: IntersectionAreaProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting && hasMore) {
        onImpression()
      }
    })
    if (triggerRef.current) {
      fetchMoreObserver.observe(triggerRef.current)
    }

    return () => {
      fetchMoreObserver.disconnect()
    }
  })

  return (
    <S.ViewMore ref={triggerRef}>
      <span>더 보기</span>
    </S.ViewMore>
  )
}

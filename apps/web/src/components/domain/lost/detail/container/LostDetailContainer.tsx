import { LostDetailContents } from '../contents'
import { OtherLostFounds } from '../otherLostFounds'
import { StickyArea } from '../stickyArea'
import * as S from './LostDetailContainer.styled'
import { useOwnArticle } from '@/hooks'

interface LostDetailContainerProps {
  createdBy: string
  subwayLine: number
}

export default function LostDetailContainer({ createdBy, subwayLine }: LostDetailContainerProps) {
  const isOwner = useOwnArticle(createdBy)

  return (
    <S.Section>
      <LostDetailContents />
      <OtherLostFounds lostType="ACQUIRE" subwayLine={subwayLine} />
      {!isOwner && <StickyArea />}
    </S.Section>
  )
}

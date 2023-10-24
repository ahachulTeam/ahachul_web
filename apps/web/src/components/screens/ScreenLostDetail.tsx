import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { LostDetailContents } from '../domain/lost/detail/contents'
import { OtherLostFounds } from '../domain/lost/detail/otherLostFounds'
import { StickyArea } from '../domain/lost/detail/stickyArea'
import { useOwnArticle } from '@/hooks'

interface LostDetailContainerProps {
  createdBy: string
  subwayLine: number
}

function LostDetailScreen({ createdBy, subwayLine }: LostDetailContainerProps) {
  const isOwner = useOwnArticle(createdBy)

  return (
    <Section>
      <LostDetailContents />
      <OtherLostFounds lostType="ACQUIRE" subwayLine={subwayLine} />
      {!isOwner && <StickyArea />}
    </Section>
  )
}

const Section = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`

export default LostDetailScreen

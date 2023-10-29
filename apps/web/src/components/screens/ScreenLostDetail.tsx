import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { LostDetailContents } from '../domain/lost/detail/contents'
import { OtherLostFounds } from '../domain/lost/detail/otherLostFounds'
import { StickyArea } from '../domain/lost/detail/stickyArea'
import PageTemplate from '../public/PageTemplate'
import { useOwnArticle } from '@/hooks/domains'
import { SEOProps } from '@/libs/SEO'

interface LostDetailContainerProps {
  metaData?: Partial<SEOProps>
}

function LostDetailScreen({ metaData }: LostDetailContainerProps) {
  const createdBy = ''
  const subwayLine = 1
  const isOwner = useOwnArticle(createdBy)

  return (
    <PageTemplate metaData={metaData}>
      <PageTemplate.ContentsSection>
        <Section>
          <LostDetailContents />
          <OtherLostFounds lostType="ACQUIRE" subwayLine={subwayLine} />
        </Section>
      </PageTemplate.ContentsSection>
      <PageTemplate.ModalOrFloatingContents>{!isOwner && <StickyArea />}</PageTemplate.ModalOrFloatingContents>
    </PageTemplate>
  )
}

const Section = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`

export default LostDetailScreen

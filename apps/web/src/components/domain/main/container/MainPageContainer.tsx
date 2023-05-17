import Link from 'next/link'
import Community from '../community/Community'
import SubwayInfo from '../subwayInfo/SubwayInfo'

import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { PATH } from '@/constants'
import { StaticSEO } from '@/constants/seo'

export type MainPageContainerProps = {
  isAuthed?: boolean
}

function MainPageContainer({ isAuthed = false }: MainPageContainerProps) {
  console.log(isAuthed)
  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.main.title}</h2>
      <S.SubwayInfoSection>
        <h3 css={S.visuallyHidden}>지하철 열차정보와 혼잡도가 궁금하다면?</h3>
        <SubwayInfo />
      </S.SubwayInfoSection>
      <S.Divider />
      <S.CommunitySection>
        <div>
          <h3 css={S.h3}>
            <b>실시간</b> HOT 게시물
          </h3>
          <Link href={PATH.COMMUNITY} aria-label="커뮤니티 페이지 링크 버튼">
            <ArrowIcon />
          </Link>
        </div>
        <Community />
      </S.CommunitySection>
    </S.Container>
  )
}

export default MainPageContainer

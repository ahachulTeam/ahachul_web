import { A11yHeading } from '@ahhachul/ui'
import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import CommunitySummary from '../domain/home/community/CommunitySummary'
import SubwayInformation from '../domain/home/subway/SubwayInformation'
import SubwayOverview from '../domain/home/subwayOverview/SubwayOverview'
import PageTemplate from '../public/PageTemplate'
import { ArrowIcon } from '@/assets/icons'
import { PATH } from '@/constants'
import { useAuth } from '@/context'

function HomeMainScreen() {
  const { isLoggedIn } = useAuth()
  console.log('isLoggedIn: ', isLoggedIn())

  return (
    <PageTemplate>
      <PageTemplate.ContentsSection>
        <A11yHeading as="h3">지하철 열차정보와 혼잡도가 궁금하다면?</A11yHeading>
        <Container>
          {!isLoggedIn() ? <SubwayInformation /> : <SubwayOverview />}
          <Divider />
          <CommunitySection>
            <div>
              <h3 css={h3}>
                <b>실시간</b> HOT 게시물
              </h3>
              <Link href={PATH.COMMUNITY} aria-label="커뮤니티 페이지 링크 버튼">
                <ArrowIcon />
              </Link>
            </div>
            <CommunitySummary />
          </CommunitySection>
        </Container>
      </PageTemplate.ContentsSection>
    </PageTemplate>
  )
}

const Container = styled.article`
  width: 100%;
`

const CommunitySection = styled.section`
  padding: 20px 16px;

  & > div:first-of-type {
    position: relative;
    margin-bottom: 18px;

    & > a {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);

      & > svg {
        transform: rotate(180deg);
        & > path {
          stroke: #aaaaaa;
        }
      }
    }
  }
`

const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`

const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: #aaaaaa;

  & > b {
    color: ${theme.colors.black};
  }
`

export default HomeMainScreen

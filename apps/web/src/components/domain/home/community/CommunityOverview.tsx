import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { ArrowIcon } from '@/assets/icons'
import { PATH } from '@/constants'

const OverviewList = dynamic(() => import('./overviewList/OverviewList'), { ssr: false })

function CommunityOverview() {
  const router = useRouter()
  const handleRouteCommunity = () => {
    router.push(PATH.COMMUNITY)
  }

  return (
    <CommunitySection>
      <div onClick={handleRouteCommunity}>
        <h3 css={h3}>
          <b>실시간</b> HOT 게시물
        </h3>
        <Link href={PATH.COMMUNITY} aria-label="커뮤니티 페이지 링크 버튼">
          <ArrowIcon />
        </Link>
      </div>
      <Suspense fallback={<div />}>
        <OverviewList />
      </Suspense>
    </CommunitySection>
  )
}

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

const h3 = (theme: Theme) => css`
  ${theme.fonts.bold18};
  color: #aaaaaa;

  & > b {
    color: ${theme.colors.black};
  }
`

export default CommunityOverview

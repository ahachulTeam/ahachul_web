import { Button as FloatingBtn } from '@ahhachul/ui'
import { Theme, css } from '@emotion/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { CommunityPageContainer, Layout } from '@/components'

export default function CommunityPage() {
  const router = useRouter()
  const pushToArticleGeneratePage = () => router.push('/community/generate', undefined, { shallow: true })

  return (
    <>
      <CommunityPageContainer />
      <FloatingBtn
        css={floatCss}
        size="md"
        type="button"
        variant="primary"
        label="+ 게시물작성"
        onClick={pushToArticleGeneratePage}
      />
    </>
  )
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

const floatCss = (theme: Theme) => css`
  position: sticky;
  position: -webkit-sticky;
  bottom: calc(${theme.size.bottomNavbar.height} + 37px);
  left: calc(100% - 16px - 132px); // fixme
  padding: 0 30px;
  filter: drop-shadow(0px 6px 16px rgba(91, 91, 91, 0.25));
`

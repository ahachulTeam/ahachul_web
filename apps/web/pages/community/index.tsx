import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { CommunityHeader, CommunityPageContainer, FloatingButton } from '@/components'
import { Layout } from '@/components/public/layout'

export default function CommunityPage() {
  const router = useRouter()
  const pushToArticleGeneratePage = () => router.push('/community/generate', undefined, { shallow: true })

  return (
    <>
      <CommunityPageContainer />
      <FloatingButton label="글쓰기" onClick={pushToArticleGeneratePage} />
    </>
  )
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityHeader />}>{page}</Layout>
}

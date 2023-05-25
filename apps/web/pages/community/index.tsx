import { ReactElement } from 'react'

import { CommunityHeader, CommunityPageContainer } from '@/components'
import { Layout } from '@/components/layout'

export default function CommunityPage() {
  return <CommunityPageContainer />
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityHeader />}>{page}</Layout>
}

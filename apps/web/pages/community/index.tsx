import { ReactElement } from 'react'

import { CommunityPageContainer, Layout } from '@/components'

export default function CommunityPage() {
  return <CommunityPageContainer />
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

import { ReactElement } from 'react'

import { CommunityDetailHeader, CommunityDetailPageContainer } from '@/components/domain/community'
import { Layout } from '@/components/public/layout'

export default function CommunityDetailPage() {
  return <CommunityDetailPageContainer />
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityDetailHeader />}>{page}</Layout>
}

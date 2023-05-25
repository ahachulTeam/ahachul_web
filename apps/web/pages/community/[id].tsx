import { ReactElement } from 'react'

import { ARTICLE_DETAIL_DUMMY_LIST } from '@/assets/dummy/community'
import { CommunityDetailHeader, CommunityDetailPageContainer } from '@/components/domain/community'
import { Layout } from '@/components/layout'

export default function CommunityDetailPage() {
  return <CommunityDetailPageContainer data={ARTICLE_DETAIL_DUMMY_LIST} />
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityDetailHeader />}>{page}</Layout>
}

import { ReactElement } from 'react'

import { ComplaintDetailHeader, ComplaintDetailPageContainer } from '@/components/domain/complaint'
import { Layout } from '@/components/layout'

export default function ComplaintPageDetailPage() {
  return <ComplaintDetailPageContainer />
}

ComplaintPageDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintDetailHeader />}>{page}</Layout>
}

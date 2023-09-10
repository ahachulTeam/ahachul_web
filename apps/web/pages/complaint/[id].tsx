import { type ReactElement } from 'react'

import { Layout } from '@/components/layout'
import { ComplainGenerateContainer, ComplaintGenerateHeader } from '@/components/domain/complaint'

export default function LostDetailPage() {
  return <ComplainGenerateContainer />
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintGenerateHeader />}>{page}</Layout>
}

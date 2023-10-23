import { type ReactElement } from 'react'

import { ComplainGenerateContainer, ComplaintGenerateHeader } from '@/components/domain/complaint'
import { Layout } from '@/components/public/layout'

export default function LostDetailPage() {
  return <ComplainGenerateContainer />
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintGenerateHeader />}>{page}</Layout>
}

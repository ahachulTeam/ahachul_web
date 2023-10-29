import { type ReactElement } from 'react'

import { ComplaintGenerateHeader } from '@/components/domain/complaint'
import Layout from '@/components/public/Layout'
import ComplaintDetailScreen from '@/components/screens/ScreenComplaintDetail'

export default function ComplaintDetailPage() {
  return <ComplaintDetailScreen />
}

ComplaintDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintGenerateHeader />}>{page}</Layout>
}

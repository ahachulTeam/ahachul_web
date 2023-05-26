import { type ReactElement } from 'react'

import { LostDetailContainer, LostDetailHeader } from '@/components/domain'
import { Layout } from '@/components/layout'

export default function LostDetailPage() {
  return <LostDetailContainer />
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostDetailHeader />}>{page}</Layout>
}

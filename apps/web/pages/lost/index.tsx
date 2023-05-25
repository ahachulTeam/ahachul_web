import { ReactElement } from 'react'

import { LostContainer, LostHeader } from '@/components/domain'
import { Layout } from '@/components/layout'

export default function LostPage() {
  return <LostContainer />
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostHeader />}>{page}</Layout>
}

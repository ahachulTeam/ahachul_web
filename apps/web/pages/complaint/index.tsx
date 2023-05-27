import { type ReactElement } from 'react'

import { Layout } from '@/components'
import { ComplaintHeader, ComplaintPageContainer } from '@/components/domain/complaint'

export default function ComplaintPage() {
  return <ComplaintPageContainer />
}

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintHeader />}>{page}</Layout>
}

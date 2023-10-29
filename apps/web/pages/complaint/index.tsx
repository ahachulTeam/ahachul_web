import { type ReactElement } from 'react'

import { ComplaintHeader } from '@/components/domain/complaint'
import Layout from '@/components/public/Layout'
import ComplaintMainScreen from '@/components/screens/MainComplaint'

export default function ComplaintPage() {
  return <ComplaintMainScreen />
}

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<ComplaintHeader />}>{page}</Layout>
}

import { type ReactElement } from 'react'

import { LostDetailContainer, LostHeader } from '@/components/domain'
import { Layout } from '@/components/layout'

export default function LostDetailPage() {
  return <LostDetailContainer />
}

LostDetailPage.useLayout = function useLayout(page: ReactElement) {
  return (
    <>
      <Layout Header={<LostHeader />}>{page}</Layout>
    </>
  )
}

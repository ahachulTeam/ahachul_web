import { type ReactElement } from 'react'

import { LostDetailContainer, LostDetailHeader } from '@/components/domain'
import { Layout } from '@/components/layout'
import { Suspense } from '@/libs'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

export default function LostDetailPage() {
  return (
    <Suspense fallback={<div>1</div>}>
      <LostDetailContainer />
    </Suspense>
  )
}

LostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostDetailHeader />}>{page}</Layout>
}

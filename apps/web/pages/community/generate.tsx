import React, { ReactElement } from 'react'

import { Layout } from '@/components'
import { CommunityGeneratePageContainer } from '@/components/domain/community'

export default function Generate() {
  return <CommunityGeneratePageContainer />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

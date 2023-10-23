import React, { ReactElement } from 'react'

import { CommunityGeneratePageContainer } from '@/components/domain/community'
import { CommunityGenerateHeader } from '@/components/domain/community/generate/header'
import Layout from '@/components/public/layout/Layout'

export default function Generate() {
  return <CommunityGeneratePageContainer />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityGenerateHeader />}>{page}</Layout>
}

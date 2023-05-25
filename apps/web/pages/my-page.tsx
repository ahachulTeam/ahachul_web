import React, { type ReactElement } from 'react'

import { MyPageContainer } from '@/components'
import { Layout } from '@/components/layout'

export default function MyPage() {
  return <MyPageContainer />
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

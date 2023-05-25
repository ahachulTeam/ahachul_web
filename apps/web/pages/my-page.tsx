import React, { type ReactElement } from 'react'

import { Layout, MyPageContainer } from '@/components'

export default function MyPage() {
  return <MyPageContainer />
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

import { type ReactElement } from 'react'

import Layout from '@/components/public/Layout'
import MyPageMainScreen from '@/components/screens/MainMyPage'

export default function MyPage() {
  return <MyPageMainScreen />
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

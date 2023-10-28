import { ReactElement } from 'react'

import { CommunityHeader } from '@/components'
import Layout from '@/components/public/Layout'
import CommunityMainScreen from '@/components/screens/MainCommunity'

export default function CommunityPage() {
  return <CommunityMainScreen />
}

CommunityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityHeader />}>{page}</Layout>
}

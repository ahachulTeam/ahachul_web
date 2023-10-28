import { ReactElement } from 'react'

import { CommunityDetailHeader } from '@/components/domain/community'
import Layout from '@/components/public/Layout'
import CommunityDetailScreen from '@/components/screens/ScreenCommunityDetail'

export default function CommunityDetailPage() {
  return <CommunityDetailScreen />
}

CommunityDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<CommunityDetailHeader />}>{page}</Layout>
}

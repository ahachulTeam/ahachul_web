import { ReactElement } from 'react'
import { LostHeader } from '@/components/domain'
import { Layout } from '@/components/public/layout'
import LostMainScreen from '@/components/screens/MainLost'

export default function LostPage() {
  return <LostMainScreen />
}

LostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostHeader />}>{page}</Layout>
}

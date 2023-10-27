import { type ReactElement } from 'react'

import { HomeHeader } from '@/components/domain/home/header'
import { Layout } from '@/components/public/layout'
import HomeMainScreen from '@/components/screens/MainHome'

export default function HomePage() {
  return <HomeMainScreen />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}

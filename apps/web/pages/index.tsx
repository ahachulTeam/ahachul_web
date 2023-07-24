// import dynamic from 'next/dynamic'
import { type ReactElement } from 'react'

import { MainPageContainer } from '@/components'
import { HomeHeader } from '@/components/domain/home'
import { Layout } from '@/components/layout'

// const BottomSheetForApp = dynamic(() => import('@/components/cta/forApp/ForApp'), {
//   ssr: false,
// })

export default function HomePage() {
  return (
    <>
      <MainPageContainer />
      {/* <BottomSheetForApp /> */}
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}

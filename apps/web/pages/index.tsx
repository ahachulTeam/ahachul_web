import { Button } from '@ahhachul/ui'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { Layout, MainPageContainer } from '@/components'

const BottomSheetForApp = dynamic(() => import('@/components/cta/forApp/ForApp'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <>
      <MainPageContainer />
      <Button label="Hello from @ahhachul/ui" />
      <BottomSheetForApp />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

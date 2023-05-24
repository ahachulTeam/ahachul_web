import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { MainPageContainer } from '@/components'
import { Header, Layout } from '@/components/layout'
import { defaultHeader } from '@/constants/header'

const BottomSheetForApp = dynamic(() => import('@/components/cta/forApp/ForApp'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <>
      <MainPageContainer />
      <BottomSheetForApp />
    </>
  )
}

HomePage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onLogoBtnClick = () => {
    const { pathname } = router

    if (pathname !== '/') {
      return pushShallowRouter('/')
    }
  }
  const onProfileBtnClick = () => pushShallowRouter('/my-page')
  const onAlarmBtnClick = () => pushShallowRouter('/alarm')

  const getHeaderProps = () => ({
    onLogoBtnClick,
    onProfileBtnClick,
    onAlarmBtnClick,
  })

  return (
    <>
      <Header {...defaultHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

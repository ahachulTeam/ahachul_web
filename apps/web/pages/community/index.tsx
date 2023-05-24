import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { CommunityPageContainer } from '@/components'
import { Header, Layout } from '@/components/layout'
import { communityHeader } from '@/constants/header'

export default function CommunityPage() {
  return <CommunityPageContainer />
}

CommunityPage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onLogoBtnClick = () => pushShallowRouter('/')
  const onSearchBtnClick = () => pushShallowRouter('/my-page')
  const onAlarmBtnClick = () => pushShallowRouter('/alarm')

  const getHeaderProps = () => ({
    onLogoBtnClick,
    onSearchBtnClick,
    onAlarmBtnClick,
  })

  return (
    <>
      <Header {...communityHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

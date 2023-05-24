import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { LostContainer } from '@/components/domain'
import { Header, Layout } from '@/components/layout'
import { lostHeader } from '@/constants/header'

export default function LostPage() {
  return <LostContainer />
}

LostPage.useLayout = function useLayout(page: ReactElement) {
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
      <Header {...lostHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

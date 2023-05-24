import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import { Header, Layout } from '@/components/layout'
import { alarmHeader } from '@/constants/header'

export default function MyPage() {
  return <div>alarm page</div>
}

MyPage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onGoBackBtnClick = () => pushShallowRouter('/')
  const onDeleteBtnClick = () => pushShallowRouter('/')

  const getHeaderProps = () => ({
    onGoBackBtnClick,
    onDeleteBtnClick,
  })

  return (
    <>
      <Header {...alarmHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

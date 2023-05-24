import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import { MyPageContainer } from '@/components'
import { Header, Layout } from '@/components/layout'
import { myPageHeader } from '@/constants/header'

export default function MyPage() {
  return <MyPageContainer />
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
      <Header {...myPageHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

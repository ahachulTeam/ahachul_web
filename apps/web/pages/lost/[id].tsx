import { useRouter } from 'next/router'
import { type ReactElement } from 'react'

import { LostDetailContainer } from '@/components/domain'
import { Header, Layout } from '@/components/layout'
import { lostDetailHeader } from '@/constants/header'

export default function LostDetailPage() {
  return <LostDetailContainer />
}

LostDetailPage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onGoBackBtnClick = () => pushShallowRouter('/')
  const onShareBtnClick = () => pushShallowRouter('/my-page')

  const getHeaderProps = () => ({
    title: '',
    onGoBackBtnClick,
    onShareBtnClick,
  })

  return (
    <>
      <Header {...lostDetailHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

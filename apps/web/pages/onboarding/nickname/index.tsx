import { useRouter } from 'next/router'
import { type ReactElement } from 'react'
import { NicknamePageContainer } from '@/components'
import { Header, Layout } from '@/components/layout'
import { loginHeader } from '@/constants/header'

export default function NicknamePage() {
  return <NicknamePageContainer />
}

NicknamePage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const onGoBackBtnClick = () => router.back()

  const getHeaderProps = () => ({
    onGoBackBtnClick,
  })

  return (
    <>
      <Header {...loginHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

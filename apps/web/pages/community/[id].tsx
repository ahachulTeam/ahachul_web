import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { ARTICLE_DETAIL_DUMMY_LIST } from '@/assets/dummy/community'
import { CommunityDetailPageContainer } from '@/components/domain/community'
import { Header, Layout } from '@/components/layout'
import { communityDetailHeader } from '@/constants/header'

export default function CommunityDetailPage() {
  return <CommunityDetailPageContainer data={ARTICLE_DETAIL_DUMMY_LIST} />
}

CommunityDetailPage.useLayout = function useLayout(page: ReactElement) {
  const router = useRouter()

  const pushShallowRouter = (path: string) => router.push(path, undefined, { shallow: true })

  const onGoBackBtnClick = () => pushShallowRouter('/')
  const onShareBtnClick = () => pushShallowRouter('/my-page')
  const onHamburgerBtnClick = () => pushShallowRouter('/alarm')

  const getHeaderProps = () => ({
    title: '자유게시판',
    onGoBackBtnClick,
    onShareBtnClick,
    onHamburgerBtnClick,
  })

  return (
    <>
      <Header {...communityDetailHeader({ ...getHeaderProps() })} />
      <Layout>{page}</Layout>
    </>
  )
}

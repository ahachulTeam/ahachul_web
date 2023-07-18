import { Header } from '@/components/layout'

export const CommunityDetailHeader = () => {
  return (
    <Header title="자유게시판" hasGoBack>
      <Header.Share />
      <Header.MiniHamburger onClick={() => console.log('share')} />
    </Header>
  )
}

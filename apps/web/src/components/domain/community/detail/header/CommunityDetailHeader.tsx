import { Header } from '@/components/layout'

export const CommunityDetailHeader = () => {
  return (
    <Header hasGoBack hasBorder>
      <Header.Share />
      <Header.MiniHamburger onClick={() => console.log('share')} />
    </Header>
  )
}

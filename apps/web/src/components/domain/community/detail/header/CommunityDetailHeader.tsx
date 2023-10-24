import { Header } from '@/components/public/layout'

export const CommunityDetailHeader = () => {
  return (
    <Header hasGoBack hasBorder>
      <Header.Share />
      <Header.MiniHamburger onClick={() => console.log('share')} />
    </Header>
  )
}

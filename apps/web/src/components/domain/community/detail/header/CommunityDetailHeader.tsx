import { Header } from '@/components/public/header'

export const CommunityDetailHeader = () => {
  return (
    <Header hasGoBack hasBorder>
      <Header.Share />
      <Header.MiniHamburger onClick={() => console.log('share')} />
    </Header>
  )
}

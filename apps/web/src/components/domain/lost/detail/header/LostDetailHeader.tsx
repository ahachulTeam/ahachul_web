import { Header } from '@/components/layout'

export const LostDetailHeader = () => {
  return (
    <Header hasGoBack>
      <Header.Share onClick={() => console.log('Share')} />
    </Header>
  )
}

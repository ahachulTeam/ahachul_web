import { Header } from '@/components/layout'

export const LostHeader = () => {
  return (
    <Header>
      <Header.PreviousBtn onClick={() => console.log('previous')} />
    </Header>
  )
}

import { Header } from '@/components/layout'

export const LostHeader = () => {
  return (
    <Header>
      <Header.Search onClick={() => console.log('Search')} />
      <Header.Alarm />
    </Header>
  )
}

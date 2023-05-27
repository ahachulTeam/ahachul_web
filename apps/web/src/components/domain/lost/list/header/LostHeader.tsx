import { Header } from '@/components/layout'

export const LostHeader = () => {
  return (
    <Header title="지하철 분실물 보관함 아하철" invisibleTitle>
      <Header.Search onClick={() => console.log('Search')} />
      <Header.Alarm />
    </Header>
  )
}

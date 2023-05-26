import { Header } from '@/components/layout'

export const HomeHeader = () => {
  return (
    <Header>
      <Header.Alarm onClick={() => console.log('Alarm')} />
    </Header>
  )
}

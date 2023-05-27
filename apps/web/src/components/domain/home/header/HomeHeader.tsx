import { Header } from '@/components/layout'
import { StaticSEO } from '@/constants'

export const HomeHeader = () => {
  return (
    <Header title={StaticSEO.main.title} invisibleTitle>
      <Header.Alarm />
    </Header>
  )
}

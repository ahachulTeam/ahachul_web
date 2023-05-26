import { Header } from '@/components/layout'
import { PATH } from '@/constants'
import { usePushShallowRouter } from '@/hooks'

export const HomeHeader = () => {
  const { pushShallowRouter } = usePushShallowRouter()

  return (
    <Header>
      <Header.Alarm onClick={pushShallowRouter(PATH.ALARM)} />
    </Header>
  )
}

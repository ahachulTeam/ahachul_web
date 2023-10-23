import { Header } from '@/components/public/layout'

export const AlarmHeader = () => {
  return (
    <Header title="알림" hasGoBack>
      <Header.Delete onClick={() => console.log('delete!')} />
    </Header>
  )
}

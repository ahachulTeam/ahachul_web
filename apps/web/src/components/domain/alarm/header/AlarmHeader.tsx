import { Header } from '@/components/layout'

export const AlarmHeader = () => {
  return (
    <Header title="알림" hasGoBack goBackToHome>
      <Header.Delete onClick={() => console.log('delete!')} />
    </Header>
  )
}

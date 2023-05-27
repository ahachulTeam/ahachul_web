import { Header } from '@/components/layout'

export const ComplaintDetailHeader = () => {
  return (
    <Header title="온도조절" hasGoBack>
      <Header.TempSave onClick={() => console.log('save')} />
    </Header>
  )
}

import { Header } from '@/components/public/header'

const SettingUserStationsHeader = () => {
  const onClick = () => {}
  return (
    <Header title="즐겨찾는 역" hasGoBack goBackToHome hasBorder={false}>
      <Header.Pencil onClick={onClick} />
    </Header>
  )
}

export default SettingUserStationsHeader

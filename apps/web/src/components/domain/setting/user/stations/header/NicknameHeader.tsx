import { useRouter } from 'next/router'
import { Header } from '@/components/public/header'

const SettingUserStationsHeader = () => {
  const router = useRouter()
  const onClickPencil = () => {
    if (router.query?.isEditMode) {
      router.replace({ pathname: router.pathname, query: {} })
    } else {
      router.push({ pathname: router.pathname, query: { isEditMode: true } })
    }
  }

  return (
    <Header title={'즐겨찾는 역'} hasGoBack hasBorder={false}>
      <Header.Pencil isEditMode={Boolean(router.query?.isEditMode)} onClick={onClickPencil} />
    </Header>
  )
}

export default SettingUserStationsHeader

import { type ReactElement } from 'react'
import SettingNicknameHeader from '@/components/domain/setting/nickname/header/NicknameHeader'
import { Layout } from '@/components/public/layout'
import SettingNicknameScreen from '@/components/screens/ScreenSettingNickname'

export default function NicknamePage() {
  return <SettingNicknameScreen />
}

NicknamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<SettingNicknameHeader />}>{page}</Layout>
}

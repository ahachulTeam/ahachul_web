import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { type ReactElement } from 'react'
import SettingNicknameHeader from '@/components/domain/setting/nickname/header/NicknameHeader'
import Layout from '@/components/public/Layout'
import SettingNicknameScreen from '@/components/screens/ScreenSettingNickname'
import { PATH } from '@/constants'
import { AccessToken } from '@/constants/token'

export default function NicknamePage() {
  return <SettingNicknameScreen />
}

NicknamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<SettingNicknameHeader />}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = parseCookies(context as (typeof parseCookies)['arguments'])

  if (!cookies[AccessToken]) {
    return {
      redirect: {
        destination: PATH.LOGIN,
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

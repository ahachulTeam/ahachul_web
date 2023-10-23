import { type ReactElement } from 'react'
import { NicknameHeader, NicknamePageContainer } from '@/components'
import { Layout } from '@/components/public/layout'

export default function NicknamePage() {
  return <NicknamePageContainer />
}

NicknamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<NicknameHeader />}>{page}</Layout>
}

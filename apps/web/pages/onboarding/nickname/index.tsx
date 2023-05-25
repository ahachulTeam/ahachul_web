import { type ReactElement } from 'react'
import { NicknamePageContainer } from '@/components'
import { Layout } from '@/components/layout'

export default function NicknamePage() {
  return <NicknamePageContainer />
}

NicknamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

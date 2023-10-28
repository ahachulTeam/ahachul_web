import { ReactElement } from 'react'

import { LostGenerateHeader } from '@/components'
import Layout from '@/components/public/Layout'
import LostPostGenerateScreen from '@/components/screens/ScreenLostPostGenerate'

export default function Generate() {
  return <LostPostGenerateScreen />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostGenerateHeader />}>{page}</Layout>
}

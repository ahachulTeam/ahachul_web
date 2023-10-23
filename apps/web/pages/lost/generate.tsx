import { ReactElement } from 'react'

import { LostGenerateContainer, LostGenerateHeader } from '@/components'
import Layout from '@/components/public/layout/Layout'

export default function Generate() {
  return <LostGenerateContainer />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<LostGenerateHeader />}>{page}</Layout>
}

import { ReactElement } from 'react'

import { Layout, LostGenerateContainer } from '@/components'

export default function Generate() {
  return <LostGenerateContainer />
}

Generate.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

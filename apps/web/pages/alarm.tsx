import React, { ReactElement } from 'react'

import { AlarmHeader, AlarmPageContainer } from '@/components/domain/alarm'
import { Layout } from '@/components/layout'

export default function Alarm() {
  return <AlarmPageContainer />
}

Alarm.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<AlarmHeader />}>{page}</Layout>
}

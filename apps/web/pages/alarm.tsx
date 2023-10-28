import React, { ReactElement } from 'react'

import { AlarmHeader } from '@/components/domain/alarm'
import Layout from '@/components/public/Layout'
import AlarmScreen from '@/components/screens/ScreenAlarm'

export default function Alarm() {
  return <AlarmScreen />
}

Alarm.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<AlarmHeader />}>{page}</Layout>
}

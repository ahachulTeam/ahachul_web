import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { ReactElement } from 'react'

import { AlarmHeader } from '@/components/domain/alarm'
import Layout from '@/components/public/Layout'
import AlarmScreen from '@/components/screens/ScreenAlarm'
import { PATH } from '@/constants'
import { AccessToken } from '@/constants/token'

// 알람 관련 스크린을 페이지로 ? 혹은 모달로 ? 기획 논의 필요
export default function Alarm() {
  return <AlarmScreen />
}

Alarm.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<AlarmHeader />}>{page}</Layout>
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

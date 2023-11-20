import { parseCookies } from 'nookies'
import { type ReactElement } from 'react'

import { getSubwayLinesServerSide } from '@/apis'
import {
  GetServerSidePropsContextWithAuthClient,
  withAuthQueryServerSideProps,
} from '@/apis/ssr/withAuthQueryServerSideProps'
import { HomeHeader } from '@/components/domain/home/header'
import Layout from '@/components/public/Layout'
import HomeMainScreen from '@/components/screens/MainHome'
import { COOKIE_KEY } from '@/constants'
import { SUBWAY_KEYS, useGetSubwayList, useMyProfileQuery } from '@/services'

interface HomePageProps {
  isLoggedIn: boolean
  dummyUserSelectedStation: string[]
}

const HomePage = ({ isLoggedIn, dummyUserSelectedStation }: HomePageProps) => {
  useMyProfileQuery({ enabled: isLoggedIn })
  useGetSubwayList()

  return <HomeMainScreen isLoggedIn={isLoggedIn} dummyUserSelectedStation={dummyUserSelectedStation} />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}

export default HomePage

export const getServerSideProps = withAuthQueryServerSideProps(async context => {
  const _context = context as GetServerSidePropsContextWithAuthClient
  const cookies = parseCookies(_context as (typeof parseCookies)['arguments'])

  await _context.queryClient.prefetchQuery(SUBWAY_KEYS.subwayList, () => getSubwayLinesServerSide(_context.api))

  return { props: { isLoggedIn: Boolean(cookies[COOKIE_KEY]), dummyUserSelectedStation: ['양재', '가능'] } }
})

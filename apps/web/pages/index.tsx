import { parseCookies } from 'nookies'
import { type ReactElement } from 'react'

import { getMyStationsServerSide, getSubwayLinesServerSide } from '@/apis'
import {
  GetServerSidePropsContextWithAuthClient,
  withAuthQueryServerSideProps,
} from '@/apis/ssr/withAuthQueryServerSideProps'
import { HomeHeader } from '@/components/domain/home/header'
import Layout from '@/components/public/Layout'
import HomeMainScreen from '@/components/screens/MainHome'
import { COOKIE_KEY } from '@/constants'
import { SUBWAY_KEYS, useGetSubwayList, useMyProfileQuery } from '@/services'
import { UserStationsModel } from '@/types'

interface HomePageProps {
  isLoggedIn: boolean
  userStations?: UserStationsModel
}

const HomePage = ({ isLoggedIn, userStations }: HomePageProps) => {
  useGetSubwayList()
  useMyProfileQuery({ enabled: isLoggedIn })

  return <HomeMainScreen isLoggedIn={isLoggedIn} userStations={userStations} />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}

export default HomePage

export const getServerSideProps = withAuthQueryServerSideProps(async context => {
  const _context = context as GetServerSidePropsContextWithAuthClient
  const cookies = parseCookies(_context as (typeof parseCookies)['arguments'])

  const isLoggedIn = Boolean(cookies[COOKIE_KEY])

  await _context.queryClient.prefetchQuery(SUBWAY_KEYS.subwayList, () => getSubwayLinesServerSide(_context.api))
  if (isLoggedIn) {
    const userStations = await _context.queryClient.fetchQuery(['user', 'me', 'stations'], () =>
      getMyStationsServerSide(_context.api)
    )
    return { props: { isLoggedIn, userStations: userStations?.result } }
  } else {
    return { props: { isLoggedIn } }
  }
})

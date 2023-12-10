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
import { SUBWAY_KEYS, useGetSubwayList, useMyProfileQuery, useMyStationsQuery } from '@/services'
import { UserStationsModel } from '@/types'

interface HomePageProps {
  isLoggedIn: boolean
  userStations?: UserStationsModel | null
}

const HomePage = ({ isLoggedIn, userStations }: HomePageProps) => {
  useGetSubwayList()
  useMyProfileQuery({ enabled: isLoggedIn })
  const { data: userStationsResponseWhenServerSideFetchFailed } = useMyStationsQuery({
    enabled: isLoggedIn && !userStations,
  })

  return (
    <HomeMainScreen
      isLoggedIn={isLoggedIn}
      userStations={userStations || userStationsResponseWhenServerSideFetchFailed}
    />
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}

export default HomePage

export const getServerSideProps = withAuthQueryServerSideProps(async context => {
  const _context = context as GetServerSidePropsContextWithAuthClient
  const cookies = parseCookies(_context as (typeof parseCookies)['arguments'])
  const hasCookieKey = Boolean(cookies[COOKIE_KEY])

  try {
    await _context.queryClient.prefetchQuery(SUBWAY_KEYS.subwayList, () => getSubwayLinesServerSide(_context.api))
  } catch (err) {
    console.log('failed fetch getSubwayLinesServerSide', err)
  }

  if (hasCookieKey) {
    try {
      const userStations = await _context.queryClient.fetchQuery(['user', 'me', 'stations'], () =>
        getMyStationsServerSide(_context.api)
      )
      return { props: { isLoggedIn: true, userStations: userStations?.result } }
    } catch (err) {
      console.log('failed fetch getMyStationsServerSide', err)
    }
  }

  return { props: { isLoggedIn: false, userStations: null } }
})

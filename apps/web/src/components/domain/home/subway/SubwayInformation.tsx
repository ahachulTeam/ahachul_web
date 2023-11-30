import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { UserStationsModel } from '@/types'

const StationDialog = dynamic(() => import('./StationDialog'), { ssr: false })
const StationLinesTab = dynamic(() => import('./StationLinesTab'), { ssr: false })
const SubwayInfoWithTimeCongestions = dynamic(() => import('./SubwayInfoWithTimeCongestions'), { ssr: false })

interface SubwayInformationProps {
  userStations?: UserStationsModel
}

function SubwayInformation({ userStations }: SubwayInformationProps) {
  return (
    <Container>
      <Suspense fallback={<div />}>
        <StationDialog userStations={userStations} />
      </Suspense>
      <Suspense fallback={<div />}>
        <StationLinesTab userStations={userStations} />
      </Suspense>

      <InfoWrapper>
        {/* <Suspense fallback={<div />}>
          <StationDirectionToggle userStations={userStations} />
        </Suspense> */}
        <Suspense fallback={<div />}>
          <SubwayInfoWithTimeCongestions userStations={userStations} />
        </Suspense>
      </InfoWrapper>
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  padding: 20px 0;
`

const InfoWrapper = styled.div`
  padding: 20px 28px 30px 28px;
`

export default SubwayInformation

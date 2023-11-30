import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import StationDialog from './StationDialog'
import StationLinesTab from './StationLinesTab'
import { UserStationsModel } from '@/types'

const StationDirectionToggle = dynamic(() => import('./StationDirectionToggle'), { ssr: false })
const SubwayInfoWithTimeCongestions = dynamic(() => import('./SubwayInfoWithTimeCongestions'), { ssr: false })

interface SubwayInformationProps {
  userStations?: UserStationsModel
}

function SubwayInformation({ userStations }: SubwayInformationProps) {
  return (
    <Container>
      <StationDialog userStations={userStations} />
      <StationLinesTab userStations={userStations} />

      <InfoWrapper>
        <Suspense fallback={<div />}>
          <StationDirectionToggle userStations={userStations} />
        </Suspense>
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

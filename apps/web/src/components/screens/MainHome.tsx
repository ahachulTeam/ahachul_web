import { css } from '@emotion/react'
import styled from '@emotion/styled'
import CommunityOverview from '../domain/home/community/CommunityOverview'
import SubwayInformation from '../domain/home/subway/SubwayInformation'
import SubwayOverview from '../domain/home/subwayOverview/SubwayOverview'
import PageTemplate from '../public/PageTemplate'
import { UserStationsModel } from '@/types'

interface HomeMainScreenProps {
  isLoggedIn: boolean
  userStations?: UserStationsModel
}

function HomeMainScreen({ isLoggedIn, userStations }: HomeMainScreenProps) {
  return (
    <PageTemplate>
      <PageTemplate.ContentsSection>
        {isLoggedIn ? <SubwayInformation userStations={userStations} /> : <SubwayOverview />}
        <Divider />
        <CommunityOverview />
      </PageTemplate.ContentsSection>
    </PageTemplate>
  )
}

const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`

export default HomeMainScreen

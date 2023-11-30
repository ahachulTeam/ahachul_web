import { Tab } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { isEmpty } from 'lodash-es'
import { useCallback, useState } from 'react'
import { useGetTrainRealTimeData } from '@/services'
import { UserStationsModel } from '@/types'

interface StationLinesTabProps {
  userStations?: UserStationsModel
}

const StationLinesTab = ({ userStations }: StationLinesTabProps) => {
  const { data: stationRealTimeData, isLoading } = useGetTrainRealTimeData(
    {
      stationId: userStations?.stationInfoList?.[0]?.stationId,
      subwayLineId: userStations?.stationInfoList?.[0]?.subwayLineInfoList?.[0]?.subwayLineId,
    },
    {
      suspense: true,
      enabled: !isEmpty(userStations),
    }
  )

  const [selectedTab, setSelectedTab] = useState<string>(
    userStations?.stationInfoList[0]?.subwayLineInfoList?.[0]?.subwayLineName as string
  )
  const tabList = userStations?.stationInfoList[0]?.subwayLineInfoList?.map(item => item.subwayLineName)
  const handleChangeTab = useCallback(
    (line: string) => () => {
      // line === 'all' 일 때 전체 노선도 보여주기
      setSelectedTab(line)
    },
    [setSelectedTab]
  )

  return (
    <UserSelectedSubwayLineBox>
      <Tab
        selectedTab={selectedTab}
        tabList={
          tabList as unknown as {
            [key: string]: string
          }
        }
        handleChangeTab={handleChangeTab}
      />
    </UserSelectedSubwayLineBox>
  )
}

const UserSelectedSubwayLineBox = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexAlignCenter};
    padding-right: 28px;
    border-bottom: 1px solid ${theme.colors.gray_22};

    & > ul:first-of-type {
      ${theme.common.flexGrowOne};
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));

      & > li:not(:last-of-type) {
        & > button {
          /* background-color: red; */
        }
      }

      & > li:last-of-type {
        & > button {
          ${theme.fonts.medium14};
          color: ${theme.colors.black};
        }
      }
    }
  `}
`

export default StationLinesTab

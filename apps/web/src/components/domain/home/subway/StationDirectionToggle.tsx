import { Toggle } from '@ahhachul/ui'
import { css } from '@emotion/react'
import { isEmpty } from 'lodash-es'
import { useCallback, useState } from 'react'
import { useGetTrainRealTimeData } from '@/services'
import { UserStationsModel } from '@/types'

interface StationDirectionToggleProps {
  userStations?: UserStationsModel
}

const StationDirectionToggle = ({ userStations }: StationDirectionToggleProps) => {
  const { data: stationRealTimeData } = useGetTrainRealTimeData(
    {
      stationId: userStations?.stationInfoList?.[0]?.stationId,
      subwayLineId: userStations?.stationInfoList?.[0]?.subwayLineInfoList?.[0]?.subwayLineId,
    },
    {
      suspense: true,
      enabled: Boolean(userStations),
    }
  )

  const [selectedDirection, setSelectedDirection] = useState(Object.keys(stationRealTimeData?.upDownData as {})?.[0])
  // 전체 노선도를 클릭 시, 어떻게 노선도를 보여줄까. 모달 ? 페이지 ?

  const handleChangeDirection = useCallback((direction: string) => () => setSelectedDirection(direction), [])

  return (
    <Toggle css={tabs} defaultValue={selectedDirection} tabAriaLabel="방면 탭 버튼">
      <Toggle.WithActionFn tabs={stationRealTimeData?.upDownData || {}} actionFn={handleChangeDirection} />
    </Toggle>
  )
}

const tabs = css`
  width: 100%;
  margin-bottom: 28px;
`

export default StationDirectionToggle

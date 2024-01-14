import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import { memo, useRef, useState } from 'react'
import TrainEachSvg from './TrainEachBox'
import TrainSvg from './TrainSvg'
import { useGetTrainCongestionData } from '@/services/train'
import { UserStationsModel } from '@/types'

interface TrainCongestionChartProps {
  userStations?: UserStationsModel
  trainNo?: number
}

function TrainCongestionChart({ userStations, trainNo }: TrainCongestionChartProps) {
  const { data: stationCongestionData } = useGetTrainCongestionData(
    {
      subwayLineId: userStations?.stationInfoList?.[0]?.subwayLineInfoList?.[0]?.subwayLineId,
      trainNo,
    },
    {
      suspense: true,
      enabled: Boolean(userStations) && Boolean(trainNo),
    }
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  useIsomorphicLayoutEffect(() => {
    const fullWidth = (containerRef.current as HTMLElement)?.getBoundingClientRect().width
    setContainerWidth(fullWidth)
  }, [])

  return (
    <Container ref={containerRef}>
      <TrainSvg width={containerWidth} />
      {containerWidth && (
        <ul>
          {stationCongestionData?.congestions?.map((item, i) => (
            <li key={i}>
              <TrainEachSvg
                color={item as unknown as 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED'}
                roomNumber={i + 1}
              />
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.common.flexCenter};
    position: relative;
    width: 100%;

    & > ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(21px, 1fr));
      column-gap: 2px;
      width: calc(100% - 40px);
      margin-left: 4px;
      position: absolute;
      top: 4px;

      & > li {
        width: 100%;
        height: 26px;
      }
    }
  `}
`

export default memo(TrainCongestionChart)

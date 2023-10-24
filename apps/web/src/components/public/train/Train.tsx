import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import { useRef, useState } from 'react'
import TrainEachSvg from './TrainEachBox'
import TrainSvg from './TrainSvg'

interface TrainProps {
  calculatedCrowdRatings?: string[]
}

function Train({
  calculatedCrowdRatings = [
    '#EE4D4D',
    '#FFC44D',
    '#A2D471',
    '#FF884D',
    '#EE4D4D',
    '#FF884D',
    '#FFC44D',
    '#A2D471',
    '#A2D471',
    '#EE4D4D',
  ],
}: TrainProps) {
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
          {calculatedCrowdRatings?.map((item, i) => (
            <li key={i}>
              <TrainEachSvg color={item} roomNumber={i + 1} />
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

export default Train

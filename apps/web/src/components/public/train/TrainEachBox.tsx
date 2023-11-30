import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { SVGProps } from 'react'

interface TrainEachSvgProps extends SVGProps<SVGSVGElement> {
  /**
   * @description fill 색상 값입니다. `isUsingFill`로 사용하지 않을 수 있습니다.
   * @default `currentColor`
   */
  color?: 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED'
  roomNumber?: number
}

const TrainEachSvg = ({ color, roomNumber }: TrainEachSvgProps) => {
  return <EachBox color={color}>{roomNumber}</EachBox>
}

const EachBox = styled.div<{ color?: 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED' }>`
  ${({ theme, color }) => css`
    ${theme.fonts.medium14};
    ${theme.common.flexCenter};
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: ${color === 'VERY_CONGESTED'
      ? '#EE4D4D'
      : color === 'CONGESTED'
      ? '#FF884D'
      : color === 'MODERATE'
      ? '#FFC44D'
      : '#A2D471'};
    color: ${theme.colors.white};
    box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.7);
  `}
`
export default TrainEachSvg

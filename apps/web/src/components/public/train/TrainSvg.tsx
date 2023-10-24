import { useMemo } from 'react'

interface TrainSvgProps {
  width?: number
}

function TrainSvg({ width = 286 }: TrainSvgProps) {
  const d = useMemo(
    () =>
      width
        ? `M0 15C0 6.71573 6.71573 0 15 0H278C282.418 0 ${width} 3.58172 ${width} 8V23H0V15Z`
        : 'M0 15C0 6.71573 6.71573 0 15 0H278C282.418 0 286 3.58172 286 8V23H0V15Z',
    [width]
  )
  return (
    <svg width={width} height="23" viewBox={`0 0 ${width} 23`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} fill="#E9E9E9" />
      <mask id="mask0_331_8624" maskUnits="userSpaceOnUse" x="0" y="0" width="286" height="23">
        <path d={d} fill="#E9E9E9" />
      </mask>
      <g mask="url(#mask0_331_8624)">
        <rect x="-2" y="4" width="13" height="13" fill="#616161" />
      </g>
    </svg>
  )
}

export default TrainSvg

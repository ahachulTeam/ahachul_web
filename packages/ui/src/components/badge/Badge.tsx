import { Line, isSubwayLine } from '@ahhachul/lib'
import { useMemo } from 'react'

import * as S from './styled'

type BadgeVariant = Line | (string & {})

export interface BadgeProps {
  className?: string
  variant: BadgeVariant
  lineUnit?: boolean
  isRounded?: boolean
  isHottest?: boolean
}

export function Badge({ className, variant, lineUnit = false, isRounded = false, isHottest = false }: BadgeProps) {
  const label = useMemo(() => {
    if (isSubwayLine(variant)) {
      return isHottest ? `${variant} HOT` : variant
    }

    return variant
  }, [variant, isHottest])

  return (
    <S.Badge className={className} variant={variant} rounded={isSubwayLine(variant) && isRounded && !isHottest}>
      {label}
      {lineUnit && '호선'}
    </S.Badge>
  )
}

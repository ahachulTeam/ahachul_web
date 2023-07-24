import { SubwayLine, Line, isSubwayLine } from '@ahhachul/lib'

import { useMemo } from 'react'
import * as S from './styled'

type BadgeVariant = Line | (string & {})

export interface BadgeProps {
  className?: string
  variant: BadgeVariant
  isHottest?: boolean
}

export function Badge({ className, variant, isHottest = false }: BadgeProps) {
  const label = useMemo(() => {
    if (isSubwayLine(variant)) {
      return isHottest ? `${variant} HOT` : SubwayLine[variant]
    }

    return variant
  }, [variant, isHottest])

  return (
    <S.StyledBadge className={className} variant={variant} rounded={isSubwayLine(variant) && !isHottest}>
      {label}
    </S.StyledBadge>
  )
}

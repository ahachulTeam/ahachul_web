import type { SubwayLine } from '@ahhachul/lib'

import * as S from './styled'

export interface BadgeProps {
  className?: string
  label: BadgeVariant
  isHottest?: boolean
}

type BadgeVariant = SubwayLine | string

export function Badge({ className, label, isHottest }: BadgeProps) {
  return (
    <S.Badge variant={label} className={className}>
      {label} {isHottest && 'HOT'}
    </S.Badge>
  )
}

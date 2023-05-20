import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo, type ReactNode } from 'react'

import { theme } from '@/styles'

// Subway Color
const variants = {
  _01: () => ({
    background: theme.colors.subway._01,
  }),
  _02: () => ({
    background: theme.colors.subway._02,
  }),
  _03: () => ({
    background: theme.colors.subway._03,
  }),
  _04: () => ({
    background: theme.colors.subway._04,
  }),
  _05: () => ({
    background: theme.colors.subway._05,
  }),
  _06: () => ({
    background: theme.colors.subway._06,
  }),
  _07: () => ({
    background: theme.colors.subway._07,
  }),
  _08: () => ({
    background: theme.colors.subway._08,
  }),
  _09: () => ({
    background: theme.colors.subway._09,
  }),
  airport: () => ({
    background: theme.colors.subway.airport,
  }),
  gyeong_joong: () => ({
    background: theme.colors.subway.gyeong_joong,
  }),
  gyeong_choon: () => ({
    background: theme.colors.subway.gyeong_choon,
  }),
  suin_bundang: () => ({
    background: theme.colors.subway.suin_bundang,
  }),
  sin_bundang: () => ({
    background: theme.colors.subway.sin_bundang,
  }),
  default: () => ({
    background: theme.colors.primary,
  }),
} as const

interface SubwayBadgeProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string
  isHottest?: boolean
  className?: string
}

interface BadgeProps {
  children: ReactNode
  variant: keyof typeof variants
}

const Badge = styled.label<BadgeProps>`
  ${({ theme, variant }) => css`
    ${theme.badge.primary};
    ${{ ...variants[(variant || 'sin_bundang') as keyof typeof variants]() }};
  `}
`

export default function SubwaytBadge({ label, isHottest, className, ...props }: SubwayBadgeProps) {
  const variant = useMemo(() => {
    switch (label) {
      case '1호선':
        return '_01'
      case '2호선':
        return '_02'
      case '3호선':
        return '_03'
      case '4호선':
        return '_04'
      case '5호선':
        return '_05'
      case '6호선':
        return '_06'
      case '7호선':
        return '_07'
      case '8호선':
        return '_08'
      case '9호선':
        return '_09'
      case '공항':
        return 'airport'
      case '경의중앙':
        return 'gyeong_joong'
      case '경춘':
        return 'gyeong_choon'
      case '수인분당':
        return 'suin_bundang'
      case '신분당':
        return 'sin_bundang'
      default:
        return 'default'
    }
  }, [label])

  return (
    <Badge variant={variant} className={className} {...props}>
      {label} {isHottest && 'HOT'}
    </Badge>
  )
}

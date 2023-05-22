import type { SubwayLine } from '@ahhachul/lib'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { theme } from '@/styles'

interface BadgeProps {
  variant: SubwayLine | string
}

export const Badge = styled.span<BadgeProps>`
  ${({ theme, variant }) => css`
    ${theme.fonts.regular10};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 8px;
    max-width: max-content;
    border-radius: 3px;
    color: ${theme.colors.white};
    background-color: ${variants[variant as SubwayLine] || theme.colors.primary};
  `}
`

const variants = {
  '1호선': theme.colors.subway._01,
  '2호선': theme.colors.subway._02,
  '3호선': theme.colors.subway._03,
  '4호선': theme.colors.subway._04,
  '5호선': theme.colors.subway._05,
  '6호선': theme.colors.subway._06,
  '7호선': theme.colors.subway._07,
  '8호선': theme.colors.subway._08,
  '9호선': theme.colors.subway._09,
  공항: theme.colors.subway.airport,
  경의중앙: theme.colors.subway.gyeong_joong,
  경춘: theme.colors.subway.gyeong_choon,
  수인분당: theme.colors.subway.suin_bundang,
  신분당: theme.colors.subway.sin_bundang,
}

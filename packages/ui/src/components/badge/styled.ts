import { theme } from '@ahhachul/design-system'
import type { Line } from '@ahhachul/lib'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface BadgeProps {
  variant: Line | string
  rounded: boolean
}

export const Badge = styled.span<BadgeProps>`
  ${({ variant, rounded }) => css`
    ${rounded ? baseBadge : hotBadge};
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: max-content;
    padding: 0 8px;
    color: ${theme.colors.white};
    background-color: ${variants()[variant as Line] || theme.colors.primary};
  `}
`

export const baseBadge = css`
  ${theme.fonts.regular14};
  min-width: 24px;
  height: 24px;
  border-radius: 120px;
`

export const hotBadge = css`
  ${theme.fonts.regular10};
  height: 19px;
  border-radius: 3px;
`

const variants = () => ({
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
})

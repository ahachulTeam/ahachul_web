import { css } from '@emotion/react'
import { colors, fonts } from '../foundations'

const flexBoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const badgeCommon = css`
  ${fonts.regular10};
  padding: 2px 8px;
  transition: 0.3s;
`

export const badge = {
  primary: css`
    ${flexBoxCenter};
    ${badgeCommon};
    min-width: max-content;
    border-radius: 3px;
    color: ${colors.white};
  `,
}

export type BadgeTheme = typeof badge

import { Button } from '@ahhachul/ui'
import { Theme, css } from '@emotion/react'
import { type ComponentProps } from 'react'

export const CancelButton = ({ ...props }: ComponentProps<typeof Button>) => {
  return <Button css={dialogCancelButtonCss} {...props} />
}

export const ConfirmButton = ({ ...props }: ComponentProps<typeof Button>) => {
  return <Button css={dialogConfirmButtonCss} {...props} />
}

const dialogCancelButtonCss = (theme: Theme) => css`
  ${theme.fonts.regular16};
  color: ${theme.colors.gray_40};
  background-color: ${theme.colors.white};
`

const dialogConfirmButtonCss = (theme: Theme) => css`
  ${theme.fonts.regular16};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.white};
`

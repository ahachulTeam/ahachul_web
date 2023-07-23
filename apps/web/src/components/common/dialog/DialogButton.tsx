import { Button } from '@ahhachul/ui'
import { css } from '@emotion/react'
import { type ComponentProps } from 'react'

export const CancelButton = ({ ...props }: ComponentProps<typeof Button>) => {
  return <Button css={dialogButtonCss} {...props} />
}

export const ConfirmButton = ({ ...props }: ComponentProps<typeof Button>) => {
  return <Button {...props} />
}

const dialogButtonCss = css`
  background-color: #fff;

  &:hover {
    background-color: #fff;
  }
`

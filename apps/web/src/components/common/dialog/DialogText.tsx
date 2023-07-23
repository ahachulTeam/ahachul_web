import { css, type Interpolation, type Theme } from '@emotion/react'
import { type PropsWithChildren } from 'react'

export const Title = ({ titleCss, children }: PropsWithChildren<{ titleCss?: Interpolation<Theme> }>) => {
  return (
    <span css={[titleBaseCss, titleCss]} className="dialog-title">
      {children}
    </span>
  )
}

export const Description = ({
  descriptionCss,
  children,
}: PropsWithChildren<{ descriptionCss?: Interpolation<Theme> }>) => {
  return (
    <pre css={[descriptionBaseCss, descriptionCss]} className="dialog-description">
      {children}
    </pre>
  )
}

const titleBaseCss = (theme: Theme) => css`
  ${theme.fonts.semibold18};

  color: ${theme.colors.black};
  text-align: center;
  white-space: pre-wrap;
`

const descriptionBaseCss = (theme: Theme) => css`
  ${theme.fonts.regular14};

  color: #6b7180;
  text-align: left;
  white-space: pre-wrap;
`

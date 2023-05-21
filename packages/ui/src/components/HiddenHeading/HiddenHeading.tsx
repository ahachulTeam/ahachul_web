import { css } from '@emotion/react'
import { ComponentType, HTMLAttributes, ReactNode } from 'react'

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface Props {
  /**
   * @description 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 중 지정할 수 있습니다.
   * @default 'h1'
   */
  as?: HeadingType
  className?: string
  children?: ReactNode
  id?: string
}

export default function HiddenHeading({ as = 'h1', id, children }: Props) {
  const Heading = as as unknown as ComponentType<HTMLAttributes<HTMLHeadingElement>>

  return (
    <Heading css={hiddenHeadingCss} id={id}>
      {children}
    </Heading>
  )
}

const hiddenHeadingCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0, 0, 0, 0);
`

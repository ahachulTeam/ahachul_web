import { Interpolation, Theme } from '@emotion/react'
import { PropsWithChildren } from 'react'
import * as S from './styled'

interface CardIconProps {
  overrideCss?: Interpolation<Theme>
}

export const CardIcon = ({ overrideCss, children }: PropsWithChildren<CardIconProps>) => {
  return <S.Box css={overrideCss}>{children}</S.Box>
}

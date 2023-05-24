import { type ReactNode } from 'react'
import * as S from './styled'

interface HeaderProps {
  leftIcon: () => ReactNode
  title?: string
  rightNodes?: () => ReactNode
}

function Header({ leftIcon, title, rightNodes }: HeaderProps) {
  return (
    <S.Header>
      <S.Container>
        {leftIcon()}
        {title && <h2>{title}</h2>}
        {rightNodes && rightNodes()}
      </S.Container>
    </S.Header>
  )
}

export default Header

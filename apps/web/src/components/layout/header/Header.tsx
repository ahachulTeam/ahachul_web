import { PropsWithChildren } from 'react'
import * as S from './styled'

function Header({ children }: PropsWithChildren) {
  return (
    <S.Header>
      <S.Container>{children}</S.Container>
    </S.Header>
  )
}

export default Header

interface PreviousBtnProps {
  onClick: () => void
}
Header.PreviousBtn = function PreviousBtn({ onClick }: PreviousBtnProps) {
  return <button type="button" onClick={onClick} />
}

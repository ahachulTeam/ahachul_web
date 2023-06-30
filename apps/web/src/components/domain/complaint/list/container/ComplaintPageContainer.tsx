import { Emergency, Environment } from '../token'
import * as S from './styled'

export const ComplaintPageContainer = () => {
  return (
    <S.Container>
      <Environment />
      <Emergency />
    </S.Container>
  )
}

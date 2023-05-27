import { Emergency } from '../emergency/Emergency'
import { Environment } from '../environment/Environment'
import * as S from './styled'

export const ComplaintPageContainer = () => {
  return (
    <S.Container>
      <Environment />
      <Emergency />
    </S.Container>
  )
}

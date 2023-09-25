import { Emergency, Environment } from '../token'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'

export const ComplaintPageContainer = () => {
  return (
    <S.Container>
      <Environment />
      <Emergency />
    </S.Container>
  )
}

import { Emergency, Environment } from '../token'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'

interface ComplaintPageContainerProps {
  toggleShowing: (target: ComplaintTargets) => () => void
}

export const ComplaintPageContainer = ({ toggleShowing }: ComplaintPageContainerProps) => {
  return (
    <S.Container>
      <Environment toggleShowing={toggleShowing} />
      <Emergency toggleShowing={toggleShowing} />
    </S.Container>
  )
}

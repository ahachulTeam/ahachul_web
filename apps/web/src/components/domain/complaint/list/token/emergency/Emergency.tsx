import { Patient, Sexual, Violence } from './cards'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'

interface EmergencyContainer {
  toggleShowing: (target: ComplaintTargets) => () => void
}

export default function Emergency({ toggleShowing }: EmergencyContainer) {
  return (
    <S.Emergency onClick={toggleShowing('Announcement')}>
      <S.Title>긴급상황 🚨</S.Title>
      <S.EmergencyCardList>
        <li>
          <Patient />
        </li>
        <li>
          <Sexual />
        </li>
        <li>
          <Violence />
        </li>
      </S.EmergencyCardList>
    </S.Emergency>
  )
}

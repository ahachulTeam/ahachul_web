import { Patient, Sexual, Violence } from './cards'
import * as S from './styled'

export default function Emergency() {
  return (
    <S.Emergency>
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

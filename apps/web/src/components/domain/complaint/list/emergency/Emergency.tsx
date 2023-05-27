import { Patient } from './cards/Patient'
import { Sexual } from './cards/Sexual'
import { Violence } from './cards/Violence'
import * as S from './styled'

export const Emergency = () => {
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

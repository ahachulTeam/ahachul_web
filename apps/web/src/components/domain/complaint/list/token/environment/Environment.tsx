import { Announcement, Facilities, Impediment, Temperature } from './cards'
import * as S from './styled'
import { ComplaintTargets } from '@/types/complaint'

interface EnvironmentContainer {
  toggleShowing: (target: ComplaintTargets) => () => void
}

export default function Environment({ toggleShowing }: EnvironmentContainer) {
  return (
    <S.Environment>
      <S.Title>지하철 환경</S.Title>
      <S.EnvironmentCardList>
        <li>
          <Facilities />
        </li>
        <li>
          <Temperature />
        </li>
        <li>
          <Announcement />
        </li>
        <li>
          <Impediment />
        </li>
      </S.EnvironmentCardList>
    </S.Environment>
  )
}

import LostFoundItem from './item/LostItem'
import * as S from './styled'
import { useViewAtom } from '@/atoms/view'

export default function LostFoundList() {
  const { view } = useViewAtom()

  return (
    <S.LostFoundList data-view={view}>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
      <li>
        <LostFoundItem view={view} />
      </li>
    </S.LostFoundList>
  )
}

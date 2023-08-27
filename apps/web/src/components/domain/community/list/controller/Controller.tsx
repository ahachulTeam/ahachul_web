import ChangeView from './changeView/ChangeView'
import { FilterList } from './filterList'
import * as S from './styled'

interface ControllerProps {
  className?: string
}

export default function Controller({ className }: ControllerProps) {
  return (
    <S.Controller className={className}>
      <ChangeView />
      <FilterList />
    </S.Controller>
  )
}

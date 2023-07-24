import * as S from './styled'
import { COMMUNITY_FILTERS } from '@/assets/static/community'
import { Filter } from '@/components/common'

interface FilterListProps {
  filter: Record<'sort' | 'subwayLineId', string>
  handleApplyFilter: (key: string) => (value: string) => void
}

export default function FilterList({ filter, handleApplyFilter }: FilterListProps) {
  return (
    <S.FilterList>
      {COMMUNITY_FILTERS.map(item => (
        <Filter
          key={item.id}
          id={item.id}
          label={item.label}
          options={item.options}
          value={filter[item.id]}
          changeValue={handleApplyFilter(item.id)}
        />
      ))}
    </S.FilterList>
  )
}

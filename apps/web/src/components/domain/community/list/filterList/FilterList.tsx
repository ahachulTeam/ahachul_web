import * as S from './styled'
import { COMMUNITY_FILTERS } from '@/assets/static/community'
import { Filter } from '@/components/common'

import { useFilterList } from '@/hooks'

export default function FilterList() {
  const { filter, handleApplyFilter } = useFilterList('ordering', 'lines')

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

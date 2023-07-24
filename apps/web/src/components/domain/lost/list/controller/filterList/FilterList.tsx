import * as S from './styled'
import { LOST_FOUND_FILTERS } from '@/assets/static/loastFound'
import { Filter } from '@/components/common'

import { useFilterList } from '@/hooks'

export default function FilterList() {
  const { filter, handleApplyFilter } = useFilterList('subwayLineId', 'origin')

  return (
    <S.FilterList>
      {LOST_FOUND_FILTERS.map(item => (
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

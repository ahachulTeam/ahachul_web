import { Filter } from "@/components/common";

import { useFilterList } from "@/hooks";

import { LOST_FOUND_FILTERS } from "@/assets/static/loastFound";

import * as S from "./styled";

export default function FilterList() {
  const { filter, handleApplyFilter } = useFilterList("ordering", "lines", "source");

  return (
    <S.FilterList>
      {LOST_FOUND_FILTERS.map(item => (
        <Filter
          key={item.id}
          id={item.id}
          label={item.label}
          options={item.options}
          value={filter[item.id]}
          chnageValue={handleApplyFilter(item.id)}
        />
      ))}
    </S.FilterList>
  );
}

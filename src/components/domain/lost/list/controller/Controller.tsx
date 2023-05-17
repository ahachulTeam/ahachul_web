import * as S from "./styled";

import ChangeView from "./changeView/ChangeView";
import FilterList from "./filterList/FilterList";

interface ControllerProps {
  className?: string;
}

export default function Controller({ className }: ControllerProps) {
  return (
    <S.Controller className={className}>
      <ChangeView />
      <FilterList />
    </S.Controller>
  );
}

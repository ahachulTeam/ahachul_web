import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import * as S from './FilterActions.styled';

interface FilterActionsProps {
  activeFilterCount: number;
  removeAllFilterControl: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  activeFilterCount,
  removeAllFilterControl,
}) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <S.FilterButton>
          <S.FilterCount>{activeFilterCount}</S.FilterCount>
          {/* <ChevronDownIcon stroke="#4C5874" className="arrow-down-img" /> */}
        </S.FilterButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className="DropdownMenuContent"
      >
        <DropdownMenu.Label className="DropdownMenuLabel">
          {activeFilterCount}개 필터가 적용됨.
        </DropdownMenu.Label>
        <DropdownMenu.Item className="DropdownMenuItem red" onClick={removeAllFilterControl}>
          모든 필터 지우기
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default FilterActions;

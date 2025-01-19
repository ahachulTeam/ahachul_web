import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ChevronIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';

import * as S from './FilterActions.styled';

interface FilterActionsProps {
  activeFilterCount: number;
  removeAllFilterControl: () => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  activeFilterCount,
  removeAllFilterControl,
}) => {
  const renderThis = activeFilterCount > 0;

  return (
    <UiComponent.ConditionalRender isRender={renderThis}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <S.FilterButton>
            <S.FilterCount>{activeFilterCount}</S.FilterCount>
            <ChevronIcon />
          </S.FilterButton>
        </DropdownMenu.Trigger>

        <S.Content align="start" sideOffset={10} alignOffset={-10} className="DropdownMenuContent">
          <S.Label className="DropdownMenuLabel">{activeFilterCount}개 필터가 적용됨.</S.Label>
          <S.Item className="DropdownMenuItem red" onClick={removeAllFilterControl}>
            모든 필터 지우기
          </S.Item>
        </S.Content>
      </DropdownMenu.Root>
    </UiComponent.ConditionalRender>
  );
};

export default FilterActions;

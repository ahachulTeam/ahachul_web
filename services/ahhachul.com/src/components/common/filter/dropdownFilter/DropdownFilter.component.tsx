import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { objectEntries } from '@ahhachul/utils';

import { ChevronIcon, CheckIcon } from '@/assets/icons/system';
import { KeyOf, StringRecord } from '@/types';

import * as S from './DropdownFilter.styled';

export interface DropdownFilterProps<T extends StringRecord, K extends KeyOf<T>> {
  name: K;
  filters: T;
  options: StringRecord;
  onSelect: (key: K, value: T[K]) => void;
}

const DropdownFilter = <T extends StringRecord, K extends KeyOf<T>>({
  name,
  filters,
  options,
  onSelect,
}: DropdownFilterProps<T, K>): React.ReactElement => {
  const activeValue = filters[name];
  const defaultValue = Object.keys(options)[0];
  const isActive = activeValue !== defaultValue;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <S.FilterButton isActive={isActive}>
          <span>{options[activeValue.toString()]}</span>
          <ChevronIcon />
        </S.FilterButton>
      </DropdownMenu.Trigger>

      <S.Content align="start" sideOffset={10} alignOffset={-10}>
        <DropdownMenu.RadioGroup
          value={activeValue.toString()}
          onValueChange={newValue => onSelect(name, newValue as T[K])}
        >
          {objectEntries(options).map(([key, value]) => (
            <S.RadioItem key={key} value={key}>
              <S.ItemIndicator>
                <CheckIcon />
              </S.ItemIndicator>
              {value}
            </S.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </S.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownFilter;

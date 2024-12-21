import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import type { KeyOf } from '@/model/Utils';
import { objectEntries } from '@/common/utils/object';
import CheckIcon from '@/common/assets/icons/check';
import ChevronDownIcon from '@/common/assets/icons/chevron-down';

export interface DropdownFilterProps<
  T extends Record<string, string>,
  K extends KeyOf<T>,
> {
  name: K;
  filters: T;
  options: Record<string, string>;
  onSelect: (key: K, value: T[K]) => void;
}

const DropdownFilter = <T extends Record<string, string>, K extends KeyOf<T>>({
  filters,
  options,
  onSelect,
  name,
}: DropdownFilterProps<T, K>): React.ReactElement => {
  const activeValue = filters[name];
  const defaultValue = Object.keys(options)[0] as T[K];
  const isActive = activeValue !== defaultValue;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          data-active={isActive}
          className=" shrink-0 h-[30px] bg-gray-10 border border-gray-20 rounded-[1000px] px-[10px] flex items-center"
        >
          <span className=" text-gray-90 text-label-medium">
            {options[activeValue]}
          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className=" w-[167px] bg-gray-10 rounded-lg shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]"
      >
        <DropdownMenu.RadioGroup
          value={activeValue as string}
          onValueChange={(newValue) => onSelect(name, newValue as T[K])}
        >
          {objectEntries(options).map(([val, label]) => (
            <DropdownMenu.RadioItem
              key={val}
              value={val}
              className=" text-gray-90 text-sm flex items-center pl-[32px] h-[45px] relative bg-white [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-gray-20"
            >
              <DropdownMenu.ItemIndicator className=" absolute left-[6px] w-[24px] inline-flex items-center justify-center">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropdownFilter;

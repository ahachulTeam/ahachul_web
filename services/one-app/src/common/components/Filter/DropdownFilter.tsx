import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import type { KeyOf } from '@/model/Utils';
import { objectEntries } from '@/common/utils/object';
import { cn } from '@/common/utils/cn';
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
          className="flex h-[30px] shrink-0 items-center rounded-[1000px] border border-gray-20 bg-gray-10 px-[10px]"
        >
          <span className="text-label-medium text-gray-90">
            {options[activeValue]}
          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={10}
          alignOffset={-10}
          className={cn(
            'w-[167px] overflow-hidden rounded-xl bg-gray-10 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]',
            'data-[state=open]:animate-[slideDownAndFade_150ms_ease-out]',
            'data-[state=closed]:animate-[slideUpAndFade_150ms_ease-out]',
            'will-change-[opacity,transform]',
          )}
        >
          <DropdownMenu.RadioGroup
            value={activeValue as string}
            onValueChange={(newValue) => onSelect(name, newValue as T[K])}
          >
            {objectEntries(options).map(([val, label]) => (
              <DropdownMenu.RadioItem
                key={val}
                value={val}
                className={cn(
                  'relative flex h-[45px] items-center bg-white pl-[32px] text-sm text-gray-90',
                  '[&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-gray-20',
                  'outline-none transition-colors hover:bg-gray-50',
                  'focus:bg-gray-50',
                )}
              >
                <DropdownMenu.ItemIndicator className="absolute left-[6px] inline-flex w-[24px] items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                {label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownFilter;

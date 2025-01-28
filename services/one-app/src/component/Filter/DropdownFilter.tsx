'use client';

import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { objectEntries } from '@ahhachul/utils';

import { CheckIcon, ChevronDownIcon } from '@/asset/icon';
import type { KeyOf, ObjectQueryParams } from '@/types';
import { cn } from '@/util';

export interface DropdownFilterProps<T extends ObjectQueryParams, K extends KeyOf<T>> {
  name: string;
  value: K;
  options: T;
}

export const DropdownFilter = <T extends ObjectQueryParams, K extends KeyOf<T>>({
  name,
  value,
  options,
}: DropdownFilterProps<T, K>): React.ReactElement => {
  const defaultValue = Object.keys(options)[0] as KeyOf<T>;
  const isActive = defaultValue !== value;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (newVal: string) => {
    let newSearchParams = new URLSearchParams(searchParams);

    if (newVal === defaultValue) {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, newVal);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'flex h-[30px] shrink-0 items-center rounded-[1000px] border border-gray-20 bg-gray-10 px-[10px]',
            isActive && 'border-gray-100',
          )}
        >
          <span className="text-label-medium text-gray-90">{options[value]}</span>
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
            'will-change-[opacity,transform]',
          )}
        >
          <DropdownMenu.RadioGroup
            value={value as string}
            onValueChange={newValue => onSelect(newValue)}
          >
            {objectEntries(options).map(([val, label]) => (
              <DropdownMenu.RadioItem
                key={val}
                value={val}
                className={cn(
                  'relative flex h-[45px] items-center bg-white pl-[32px] text-sm text-gray-90',
                  '[&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-gray-20',
                  'outline-none transition-colors',
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

'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ChevronDownIcon } from '@/asset/icon';
import { cn } from '@/util';

import { ConditionalRender } from '../ConditionalRender';

interface Props {
  activatedCount: number;
  handleResetAction: () => void;
}

export const ResetFilter = ({ activatedCount, handleResetAction }: Props) => {
  const renderThis = activatedCount > 0;

  return (
    <ConditionalRender isRender={renderThis}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className=" shrink-0 h-[30px] bg-gray-10 border border-gray-20 rounded-[1000px] px-[10px] flex items-center">
            <span className=" text-label-medium rounded-full bg-gray-90 text-gray-0 w-[14px] h-[14px] text-[9px] font-medium inline-flex items-center justify-center">
              {activatedCount}
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
              'will-change-[opacity,transform]',
            )}
          >
            <DropdownMenu.Label className=" py-3 px-3 text-xs text-gray-90">
              {activatedCount}개 필터가 적용됨.
            </DropdownMenu.Label>
            <DropdownMenu.Item
              className=" text-red text-sm flex items-center pl-[12px] h-[45px] relative bg-white"
              onClick={handleResetAction}
            >
              모든 필터 지우기
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </ConditionalRender>
  );
};

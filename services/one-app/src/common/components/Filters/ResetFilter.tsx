import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ChevronDownIcon from '@/common/assets/icons/chevron-down';
import { ConditionalRender } from '../ConditionalRender';

interface Props {
  activedCount: number;
  handleReset: () => void;
}
const ResetFilter = ({ activedCount, handleReset }: Props) => {
  return (
    <ConditionalRender isRender={activedCount > 0}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button>
            <span>{activedCount}</span>
            <ChevronDownIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          align="start"
          sideOffset={10}
          alignOffset={-10}
          className="DropdownMenuContent"
        >
          <DropdownMenu.Label className="DropdownMenuLabel">
            {activedCount}개 필터가 적용됨.
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className="DropdownMenuItem red"
            onClick={handleReset}
          >
            모든 필터 지우기
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </ConditionalRender>
  );
};

export default ResetFilter;

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import * as styles from './DropEllipsis.css';

export interface DropEllipsisProps {
  commentId: number;
  optionList: Record<
    string,
    {
      label: string;
      onClick: (commentId: number) => void;
    }
  >;
}

export const DropEllipsis = ({
  commentId,
  optionList,
}: DropEllipsisProps): React.ReactElement => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button css={styles.buttonFilter}>
          <EllipsisIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        sideOffset={-5}
        alignOffset={-100}
        className="DropdownMenuContent"
      >
        <DropdownMenu.RadioGroup>
          {Object.entries(optionList).map(([key, val]) => (
            <DropdownMenu.RadioItem
              key={key}
              value={key}
              className="DropdownMenuRadioItem"
              onClick={() => val.onClick(commentId)}
            >
              {val.label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

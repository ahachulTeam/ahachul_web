import React from 'react';
import { objectEntries } from 'shared/lib/utils/object/object-entries';
import * as styles from './SelectList.css';

interface SelectListProps {
  current: string;
  options: Record<string, string>;
  hasError?: boolean;
  handleChange: (key: string) => () => void;
}

export const SelectList = ({
  current,
  options,
  hasError,
  handleChange,
}: SelectListProps) => {
  return (
    <div css={styles.wrap}>
      {objectEntries(options).map(([key, val]) => {
        const isSame = current === key;
        return (
          <button
            id={key}
            key={key}
            type="button"
            css={[
              styles.select(isSame),
              {
                borderColor: hasError ? '#E02020' : 'rgb(196, 212, 252, 0.37)',
              },
            ]}
            onClick={handleChange(key)}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};

import { objectEntries } from 'shared/lib/utils/object/object-entries';

import * as styles from './SelectList.css';

interface SelectListProps {
  current: string;
  options: Record<string, string>;
  hasError?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

export const SelectList = ({
  current,
  options,
  hasError,
  className,
  onChange,
}: SelectListProps) => {
  return (
    <div css={styles.wrap} className={className}>
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
            onClick={() => onChange(key)}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};

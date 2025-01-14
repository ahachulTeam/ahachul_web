import React, { useReducer } from 'react';

import { SUBWAY_OPTION_LIST } from 'features/subway-lines/data';
import { ChevronIcon } from 'shared/static/icons/chevron';
import { SelectList } from 'shared/ui/Select/SelectList';
import { Drawer } from 'vaul';

import * as styles from './Filter.css';

interface SubwayFilterProps {
  name: string;
  title: string;
  buttonLabel: string;
  current: string;
  errorMsg?: string;
  onChange: (value: string) => void;
}

const SubwayFilter: React.FC<SubwayFilterProps> = ({
  current,
  title,
  buttonLabel,
  errorMsg,
  onChange,
}) => {
  const [isOpen, toggleOpen] = useReducer(open => !open, false);

  const handleChange = (value: string) => {
    onChange(value);
    toggleOpen();
  };

  return (
    <Drawer.Root open={isOpen} shouldScaleBackground onOpenChange={toggleOpen}>
      <Drawer.Trigger asChild>
        <button css={styles.subwaySelect} data-active={!!current} aria-invalid={!!errorMsg}>
          <span>{current ? SUBWAY_OPTION_LIST[current] : buttonLabel}</span>
          <ChevronIcon css={styles.chevronIcon} />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay css={styles.overlay} />
        <Drawer.Content css={[styles.drawerContainer, { height: 'auto' }]}>
          <div css={styles.content}>
            <div css={styles.drawerHeader}>
              <button css={styles.cancel} onClick={toggleOpen}>
                취소
              </button>
              <Drawer.Title css={styles.headerTitle}>{title}</Drawer.Title>
              <button disabled css={[styles.done, { color: 'rgb(34, 34, 38)' }]}>
                완료
              </button>
            </div>
            <div css={styles.subwayListContainer}>
              <SelectList
                css={styles.subwayList}
                options={SUBWAY_OPTION_LIST}
                current={current}
                onChange={handleChange}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SubwayFilter;

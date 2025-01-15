import React, { useState } from 'react';

import { Drawer } from 'vaul';
import { SearchIcon } from 'widgets/layout-header/static/icons/search';

import * as styles from './Filter.css';
import { FilterButton } from './FilterButton';

export interface DrawerFilterProps {
  title: string;
  buttonLabel: string;
}

export const DrawerFilter: React.FC<DrawerFilterProps> = ({ title, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 앱으로 집어넣을 때 삭제할 코드
  const handleToggleDrawer = () => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const themeColor = !isOpen ? '#000000' : '#141517';
      metaThemeColor.setAttribute('content', themeColor);
    }
    setIsOpen(!isOpen);
  };

  return (
    <Drawer.Root
      open={isOpen}
      shouldScaleBackground
      repositionInputs={false}
      onOpenChange={handleToggleDrawer}
    >
      <Drawer.Trigger asChild>
        <FilterButton label={buttonLabel} isActive={false} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay css={styles.overlay} />
        <Drawer.Content css={styles.drawerContainer}>
          <div css={styles.content}>
            <div css={styles.drawerHeader}>
              <button css={styles.cancel} onClick={() => handleToggleDrawer()}>
                취소
              </button>
              <Drawer.Title css={styles.headerTitle}>{title}</Drawer.Title>
              <button css={styles.done} onClick={() => handleToggleDrawer()}>
                완료
              </button>
            </div>
            <div css={styles.searchGroup}>
              <button css={styles.addOn}>
                <SearchIcon />
              </button>
              <input css={styles.input} placeholder="사용자 필터링" />
            </div>
            <div
              css={{
                backgroundColor: '#2E2F37',
                height: 'calc(100% - 200px)',
                borderRadius: '12px',
              }}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

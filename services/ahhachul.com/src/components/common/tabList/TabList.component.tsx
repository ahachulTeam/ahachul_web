import { useRef } from 'react';

import type { TabInfo } from '@/types';
import { useTabsKeyTrap } from '@/hooks';
import Tab from './tab/Tab.component';
import * as S from './TabList.styled';

interface TabListProps<T extends string> {
  className?: string;
  ariaLabel: string;
  tabs: ReadonlyArray<TabInfo<T>>;
  currentTab: T;
  onClick: (tabId: T) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TabList = <T extends string>({
  className,
  ariaLabel,
  tabs,
  currentTab,
  onClick,
}: TabListProps<T>) => {
  const tablistRef = useRef(null);
  const { handleKeyListener } = useTabsKeyTrap(tablistRef);

  return (
    <S.TabListContainer className={className}>
      <S.TabList
        ref={tablistRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyListener}
      >
        {tabs.map(({ label, tab, panel }) => (
          <Tab
            key={tab}
            id={tab}
            label={label}
            controlPanel={panel}
            isCurrentTab={tab === currentTab}
            onClick={onClick}
          />
        ))}
      </S.TabList>
    </S.TabListContainer>
  );
};

export default TabList;

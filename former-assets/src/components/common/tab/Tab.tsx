import React from "react";

import useTab from "./hooks/useTab";
import * as S from "./styled";

interface TabProps {
  className?: string;
  tabList: { [key: string]: string };
}

function Tab({ className, tabList }: TabProps) {
  const { selectedTab, handleChangeTab } = useTab(tabList);

  return (
    <section>
      <S.Tab role="tablist" className={className}>
        {Object.entries(tabList).map(([key, label]) => (
          <li key={key} role="none">
            <S.TabBtn
              role="tab"
              type="button"
              aria-controls={label}
              aria-selected={selectedTab === key}
              onClick={handleChangeTab(key)}
            >
              {label}
            </S.TabBtn>
          </li>
        ))}
      </S.Tab>
    </section>
  );
}

export default Tab;

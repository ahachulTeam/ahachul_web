import * as S from './styled'

interface TabProps {
  className?: string
  tabList: { [key: string]: string }
  selectedTab: string | string[]
  handleChangeTab: (tab: string) => () => void
}

export function Tab({ className, tabList, selectedTab, handleChangeTab }: TabProps) {
  return (
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
  )
}

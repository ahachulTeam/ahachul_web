import React, { createContext, useContext, useMemo } from 'react'
import type { ReactNode, PropsWithChildren } from 'react'

import * as S from './styled'

interface ToggleProps {
  defaultValue: string
  tabAraiLabel: string
  className?: string
}

interface ToggleTab {
  tabLabel: string
  component: ReactNode
}

interface ToggleWithChildrenProps {
  tabs: ToggleTab[]
}

interface ToggleWithActionFnProps<T extends Record<string, string>> {
  tabs: T
  actionFn: (select: keyof T) => void
}

interface ToggleContextValue {
  tabAraiLabel: string
}

const ToggleContext = createContext({} as ToggleContextValue)

function ToggleMain({ defaultValue, tabAraiLabel, children, className }: PropsWithChildren<ToggleProps>) {
  const providerValue = useMemo(() => ({ tabAraiLabel }), [tabAraiLabel])

  return (
    <ToggleContext.Provider value={providerValue}>
      <S.ToggleRoot defaultValue={defaultValue} className={className}>
        {children}
      </S.ToggleRoot>
    </ToggleContext.Provider>
  )
}

const ToggleWithChildren = function ToggleWithChildren({ tabs }: ToggleWithChildrenProps) {
  const { tabAraiLabel } = useContext(ToggleContext)

  return (
    <>
      <S.ToggleList aria-label={tabAraiLabel}>
        {tabs.map(item => (
          <S.ToggleTrigger key={item.tabLabel} value={item.tabLabel}>
            {item.tabLabel}
          </S.ToggleTrigger>
        ))}
      </S.ToggleList>
      {tabs.map(item => (
        <S.ToggleContent key={item.tabLabel} value={item.tabLabel}>
          {item.component}
        </S.ToggleContent>
      ))}
    </>
  )
}

const ToggleWithActionFn = function ToggleWithActionFnProps<T extends Record<string, string>>({
  tabs,
  actionFn,
}: ToggleWithActionFnProps<T>) {
  const { tabAraiLabel } = useContext(ToggleContext)

  const action = (tab: string) => () => actionFn(tab)

  return (
    <S.ToggleList aria-label={tabAraiLabel}>
      {Object.entries(tabs).map(([val, label]) => (
        <S.ToggleTrigger key={val} value={val} onClick={action(val)}>
          {label}
        </S.ToggleTrigger>
      ))}
    </S.ToggleList>
  )
}

export const Toggle = Object.assign(ToggleMain, {
  WithChildren: ToggleWithChildren,
  WithActionFn: ToggleWithActionFn,
})

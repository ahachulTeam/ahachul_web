export type SwitchCaseProps<Case extends string> = {
  caseBy: Partial<Record<Case, JSX.Element | null>>
  value: Case
  defaultComponent?: JSX.Element | null
}

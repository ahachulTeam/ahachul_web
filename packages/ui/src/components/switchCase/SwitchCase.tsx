import { SwitchCaseProps } from './SwitchCase.types'

export default function SwitchCase<Case extends string>({
  value,
  caseBy,
  defaultComponent = null,
}: SwitchCaseProps<Case>) {
  if (value == null) {
    return defaultComponent
  }

  return caseBy[value] ?? defaultComponent
}

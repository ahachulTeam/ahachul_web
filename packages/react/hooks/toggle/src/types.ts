export type ToggleProps = {
  isSelected?: boolean;
}

export interface UseToggleReturn {
  readonly isSelected: boolean;
  setSelected(isSelected: boolean): void;
  toggle(): void;
}

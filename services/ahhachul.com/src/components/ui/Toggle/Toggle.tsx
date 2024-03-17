import { ToggleList, ToggleRoot, ToggleTrigger } from './styled';

interface ToggleProps<T extends Record<string, string>> {
  tabs: T;
  defaultValue: string;
  name: string;
  className?: string;
  actionFn: (select: keyof T) => void;
}

function Toggle<T extends Record<string, string>>({ tabs, defaultValue, name, className, actionFn }: ToggleProps<T>) {
  const action = (tab: string) => () => actionFn(tab);

  return (
    <ToggleRoot defaultValue={defaultValue} className={className}>
      <ToggleList aria-label={name}>
        {Object.entries(tabs).map(([val, label]) => (
          <ToggleTrigger key={val} value={val} onClick={action(val)}>
            {label}
          </ToggleTrigger>
        ))}
      </ToggleList>
    </ToggleRoot>
  );
}

export default Toggle;

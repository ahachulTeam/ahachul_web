import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";

interface ToggleProps<T extends Record<string, string>> {
  tabs: T;
  defaultValue: string;
  name: string;
  className?: string;
  actionFn: (select: keyof T) => void;
}

function Toggle<T extends Record<string, string>>({
  tabs,
  defaultValue,
  name,
  className,
  actionFn,
}: ToggleProps<T>) {
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

const ToggleRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ToggleList = styled(Tabs.List)`
  position: relative;
  flex-shrink: 0;
  display: flex;
  background-color: #f6f7f9;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    background-color: #2acf6c;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 250ms ease-in-out;
    border-radius: 6px;
  }

  &:has(> button:first-of-type[data-state="active"])::before {
    transform: translateX(0);
  }

  &:has(> button:last-child[data-state="active"])::before {
    transform: translateX(100%);
  }
`;

const ToggleTrigger = styled(Tabs.Trigger)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 44px;
  color: #999999;
  user-select: none;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  font-weight: 500;

  &[data-state="active"] {
    color: #fff;
  }
`;

export default Toggle;

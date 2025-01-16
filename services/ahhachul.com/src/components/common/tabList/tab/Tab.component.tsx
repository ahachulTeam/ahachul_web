import * as S from './Tab.styled';

interface TabProps<T> {
  id: T;
  label: string;
  controlPanel: string;
  isCurrentTab: boolean;
  onClick: (tabId: T) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab = <T extends string>({ id, label, controlPanel, isCurrentTab, onClick }: TabProps<T>) => {
  return (
    <S.Tab
      id={id}
      type="button"
      tabIndex={isCurrentTab ? 0 : -1}
      role="tab"
      aria-controls={controlPanel}
      aria-selected={isCurrentTab}
      onClick={onClick(id)}
    >
      {label}
    </S.Tab>
  );
};

export default Tab;

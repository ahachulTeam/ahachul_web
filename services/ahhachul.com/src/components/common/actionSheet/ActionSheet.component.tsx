import { useDisableScroll } from '@/hooks';

import * as S from './ActionSheet.styled';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  actions: {
    label: string;
    onClick: () => void;
  }[];
}

const ActionSheet = ({ isOpen, onClose, actions }: ActionSheetProps) => {
  useDisableScroll();

  if (!isOpen) return null;

  return (
    <>
      <S.Dim onClick={onClose} />
      <S.Sheet>
        <S.Container>
          {actions.map(action => (
            <S.ActionButton
              key={action.label}
              onClick={() => {
                action.onClick();
                onClose();
              }}
            >
              {action.label}
            </S.ActionButton>
          ))}
        </S.Container>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.Sheet>
    </>
  );
};

export default ActionSheet;

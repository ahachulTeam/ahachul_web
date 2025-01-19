import { Portal } from '..';

import * as S from './Modal.styled';

interface ModalProps {
  mounted: boolean;
  children: React.ReactNode;
}

const Modal = ({ mounted, children }: ModalProps) => {
  return (
    <Portal mounted={mounted}>
      <S.Dim>{children}</S.Dim>
    </Portal>
  );
};

export default Modal;

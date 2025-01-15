import { useRecoilValue } from 'recoil';

import { Portal } from '@/components';
import toastState from '@/store/toast';
import ToastItem from './item/ToastItem.component';
import * as S from './Toast.styled';

const Toast = () => {
  const toasts = useRecoilValue(toastState);

  return (
    <Portal elementId="toast-root" mounted={!!toasts.length}>
      <S.Wrapper>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </S.Wrapper>
    </Portal>
  );
};

export default Toast;

import { useState, useEffect } from 'react';

import type { Toast } from '@/store/toast';
import { DEFAULT_TRANSITION } from '@/constants';
import * as S from './ToastItem.styled';

const ToastItem = ({ content }: Toast) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const setExistTimeout = setTimeout(() => {
      setIsClosing(true);
    }, DEFAULT_TRANSITION);

    return () => {
      clearTimeout(setExistTimeout);
    };
  }, []);

  return (
    <S.ToastWrapper isClosing={isClosing}>
      <S.Container role="status">
        <pre>{content}</pre>
      </S.Container>
    </S.ToastWrapper>
  );
};

export default ToastItem;

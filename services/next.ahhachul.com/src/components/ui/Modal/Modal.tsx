import React, { type PropsWithChildren, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from '@/src/hooks';
import { AnimatePortal } from '../Portal';
import { modalOverlayCss, modalContentCss } from './style';
import { ModalProps } from '@/src/types';

/**
 * @description Modal 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기
 * @param children 모달 내부 컨텐츠
 *
 */
function Modal({ isOpen, children, onClose }: PropsWithChildren<ModalProps>) {
  const modalRef = useRef(null);

  useOutsideClick({
    ref: modalRef,
    handler: () => {
      onClose();
    },
  });

  return (
    <AnimatePortal isShowing={isOpen} mode="popLayout">
      <div css={modalOverlayCss}>
        <motion.div
          key="modal"
          css={modalContentCss}
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.03 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePortal>
  );
}

export default Modal;

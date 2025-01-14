import { type PropsWithChildren, useRef } from 'react';

import { motion } from 'framer-motion';
import { useOutsideClick } from 'shared/lib/hooks/useOutsideClick';

import * as styles from './Modal.css';

import { AnimatePortal } from '../Portal';

/**
 * @description Modal 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기
 * @param children 모달 내부 컨텐츠
 *
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <div css={styles.modalOverlayCss}>
        <motion.div
          key="modal"
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

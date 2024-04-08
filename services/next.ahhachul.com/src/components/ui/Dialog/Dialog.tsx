import { DialogProps } from '@/src/types';
import {
  dialogTitleCss,
  dialogContentCss,
  dialogWrapperCss,
  textWrapperCss,
  buttonWrapperCss,
  dialogButtonTextCss,
} from './style';
import { Modal } from '../Modal';

/**
 * @description Dialog 컴포넌트
 * @param onCancel 취소 버튼 클릭 시 실행되는 함수
 * @param onConfirm 확인 버튼 클릭 시 실행되는 함수
 * @param cancelText 취소 버튼 텍스트 (없을시 버튼 노출 안함)
 * @param confirmText  확인 버튼 텍스트 (없을시 버튼 노출 안함)
 * @param content 다이얼로그 내용
 * @param title 다이얼로그 타이틀
 *
 * @constructor
 */
function Dialog({ onCancel, onConfirm, cancelText, confirmText, title, content, onClose, isOpen }: DialogProps) {
  const handleCancel = () => {
    onClose();
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    onClose();
    onConfirm && onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div css={dialogWrapperCss}>
        <div css={textWrapperCss}>
          {title && <p css={dialogTitleCss}>{title}</p>}
          {content && <p css={dialogContentCss}>{content}</p>}
        </div>
        <div>
          <div css={buttonWrapperCss}>
            {cancelText && (
              <button onClick={handleCancel} css={dialogButtonTextCss}>
                {cancelText}
              </button>
            )}
            <button onClick={handleConfirm}>{confirmText}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Dialog;

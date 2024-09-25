import React from 'react';
import { AnimatePortal } from 'shared/ui/Portal';
import * as styles from './FormField.css';

interface SubmitButtonGProps {
  isActive: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  buttonText: string;
}

export const SubmitButton: React.FC<SubmitButtonGProps> = ({
  isActive,
  isSubmitting,
  buttonText,
  onSubmit,
}) => {
  return (
    <AnimatePortal isShowing={isActive}>
      <div css={styles.submitGroup}>
        <button
          type="button"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          css={styles.submit}
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
    </AnimatePortal>
  );
};

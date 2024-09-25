import React, { HTMLAttributes } from 'react';
import InfoIcon from 'shared/static/icons/info';
import * as styles from './FieldErrorMessage.css';

interface FieldErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  errMsg?: string | null | undefined;
}

export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  errMsg,
  ...props
}) => {
  if (!errMsg) return null;

  return (
    <div css={styles.errMsgWrap} {...props}>
      <InfoIcon />
      <span>{errMsg}</span>
    </div>
  );
};
